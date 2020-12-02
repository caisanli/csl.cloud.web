const CHUNK_SIZE = 1024 * 1024 * 5;
  function fileChange(e) {
      const file = e.target.files[0];
      const chunks = Math.ceil(file.size / CHUNK_SIZE);
      upload(chunks, file)
  }

  function upload(total, file, index = 0) {
      if(index >= total) {
          alert('上传完成')
          return ;
      }
      const formData = new FormData();
      formData.append('name', file.name)
      formData.append('size', file.size);
      formData.append('chunks', total)
      formData.append('chunk', (index + 1) + '');
      formData.append('folder', '0');
      formData.append('modifyDate', new Date(file.lastModifiedDate).getTime() + '')
      let start = index * CHUNK_SIZE;
      let end = CHUNK_SIZE * (index + 1);
      end = end > file.size ? file.size : end;
      console.log('end：' + end)
      formData.append('file', file.slice(start, end))
      fetch('http://127.0.0.1:3000/apis/file/upload', {
          method: 'POST',
          body: formData,
          credentials: 'include'
      }).then(res => {
          return res.json();
      }).then(res => {
        if(res.code === 1)
          upload(total, file, ++index)
      }).catch(err => {
          console.log(err)
      })
  }
