import React, {Component} from 'react'
import io from 'socket.io-client'
import parseMagnet from 'magnet-uri'
import { Player, BigPlayButton } from 'video-react'
import 'video-react/dist/video-react.css'
import url from 'url'
import path from 'path'
import propTypes from 'prop-types'
import Spinner from './Spinner'

const downloader = "https://palomitas-dl.fuken.xyz"
class MagnetLoader extends Component {
  static propTypes = {
    magnet: propTypes.string
  }
  state = {
    loading: false,
    videoUrl: null
  }
  torrentsPromise = null;
  torrents = [];
  socket = null;
  targetHash = null;
  componentDidMount() {
    // setup socket.io
    this.socket = io(downloader+"/")
    this.socket.on('connect', () => {
      console.log("MagnetLoader: connected to Palomitas Downloader")
    })
    this.socket.on('finished', (hash) => {
      this.fetchTorrentFiles(hash)
      this.setState({loading: false})
    })
    this.socket.on('destroyed', (hash) => this.deleteTorrent(hash))
    this.socket.on('download', (hash, percent) => this.updateProgress(hash, percent))
    this.torrentsPromise = this.fetchTorrents()
  }
  async componentWillReceiveProps(nextProps) {
    this.setState({ videoUrl: '' })    
    if(!nextProps.magnet) {
      return;
    }

    const hash = parseMagnet(nextProps.magnet).infoHash;
    this.targetHash = hash;
    await this.torrentsPromise;

    if(this.isTorrentInServer(hash)) {
      this.fetchTorrentFiles(hash);
    } else {
      this.setState({loading: true})
      this.postTorrent(nextProps.magnet);
    }
  }
  updateProgress(hash, percent) {
    if(this.targetHash !== hash) {
      return;
    }
    this.setState({ loadingPercent: parseFloat(percent).toFixed(2) })
  }

  isTorrentInServer(hash) {
    return this.torrents.some(storedHash => storedHash === hash);
  }

  fetchTorrents() {
    return window.fetch(`${downloader}/torrents`)
      .then(res => res.json())
      .then(json => {
        this.torrents = json.map(torrent => torrent.infoHash);
      });
  }
  fetchTorrentFiles(hash) {
    if(this.targetHash !== hash) {
      return;
    }

    return window.fetch(`${downloader}/torrents/${hash}`)
    .then(res => res.json())
    .then(json => {
      console.log("MagnetLoader: torrent loaded: ", json)
      return json;
    })
    .then(json => {
      const biggestFile = this.selectBiggestFile(json.files);
      console.log("MagnetLoader: biggest file is: ", biggestFile);
      console.log("MagnetLoader: loading video URL ", downloader+biggestFile.link);
      this.setState({
        videoUrl: `${downloader}${biggestFile.link}`
      })
    })
  }
  postTorrent(magnet) {
    window.fetch(`${downloader}/torrents`, {
      method: 'POST',
      body: JSON.stringify({link: magnet}),
      headers: {
        'Content-Type': 'application/json'
      }
    });
  }
  deleteTorrent(hash) {
    this.torrents = this.torrents.filter(storedHash => storedHash !== hash);
  }

  selectBiggestFile(files) {
    return files.reduce((prev, next) => {
      return next.length > prev.length ? next : prev;
    });
  }

  getFilenames() {
    if(!this.state.videoUrl) {
      return
    }
    const urlParts = url.parse(this.state.videoUrl)
    const pathName = decodeURIComponent(urlParts.pathname)
    const extName = path.extname(pathName)
    const fileName = path.basename(pathName, extName)
    return {
      video: `${fileName}.${extName}`,
      subs: `${fileName}.vtt`
    }
  }

  render() {
    const filenames = this.getFilenames();
    if(!this.props.magnet) {
      return null;
    }
    if(!this.state.videoUrl) {
      return (
        <div>
          <p>
            Descargando capitulo al servidor de streaming. 
            Por favor, espere.
          </p>
          <p style={{
            padding: '2px',
            textAlign: 'right',
            background: `linear-gradient(
              to right, 
              #2fae39 0%,
              #eee ${this.state.loadingPercent}%
            )`
          }}>{this.state.loadingPercent}%</p>
          <Spinner />          
        </div>
      )
    }
    return (
      <div style={{margin: '1em 0'}}>
        <Player
          controls
          style={{width: '100%', height: 'auto'}}
          crossOrigin="anonymous">
          <BigPlayButton className="player-btn" position="center" />
          <source src={this.state.videoUrl} type='video/ogg; codecs="theora, vorbis"'/>
          <source src={`${this.state.videoUrl}?ffmpeg=remux`} type="video/webm" />
          <track
            default
            label="English"
            srcLang="en"
            kind="subtitles"
            src={`${this.state.videoUrl}?ffmpeg=subs`}
          />
        </Player>
        <p>
          <a download={filenames.video} 
             href={this.state.videoUrl}>
            Descargar video
          </a>
        </p>
        <p>
          <a download={filenames.subs} 
             href={`${this.state.videoUrl}?ffmpeg=subs`}>
            Descargar subtitulos
          </a>
        </p>
      </div>
    );
  }
}

export default MagnetLoader;
