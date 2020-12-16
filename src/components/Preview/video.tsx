import React, { useRef, useEffect } from 'react';
import { Modal } from 'antd';
import videoJs, { VideoJsPlayer } from 'video.js';
import 'video.js/dist/video-js.min.css';
type Props = {
  visible: boolean;
  url: string;
  onCancel?: () => void;
};
let player: VideoJsPlayer;
export default function(props: Props) {
  const { visible, url, onCancel } = props;
  const videoRef = useRef(null);
  useEffect(() => {
    if (!videoRef.current || !visible) return;
    const sources = [
      {
        src: url,
        type: 'video/mp4',
      },
    ];
    if (player) {
      player.src(sources);
      player.play();
    } else {
      player = videoJs(videoRef.current, {
        autoplay: true,
        controls: true,
        sources,
      });
    }

    return function() {
      player && player.pause();
    };
  }, [visible]);
  return (
    <Modal
      onCancel={onCancel}
      wrapClassName="prev-modal"
      visible={visible}
      footer={null}
    >
      <div data-vjs-player>
        <video
          ref={videoRef}
          className="video-js"
          style={{
            width: '100%',
            height: '100%',
          }}
        ></video>
      </div>
    </Modal>
  );
}
