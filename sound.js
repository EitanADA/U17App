import React from 'react';
import Sound from 'react-sound';

class SoundComponent extends React.Component {
    render() {
        return <Sound
            url={this.props.sound}
            autoLoad={true}
            playStatus={Sound.status.PLAYING}
            playFromPosition={0 /* in milliseconds */}
            onLoading={this.handleSongLoading}
            onPlaying={this.handleSongPlaying}
            onFinishedPlaying={this.props.soundState}
        />
    }
}

export default SoundComponent;