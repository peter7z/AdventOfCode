const EventEmitter = require('events');

class Resource extends EventEmitter {
  constructor(name){
    super()
    this.name = name
    this.data = []
    this.log = this.log.bind(this);
    this.read = this.read.bind(this);
    this.write = this.write.bind(this);
  }

  log() {
    console.log(this.name, this.data)
  }

  read() {
    return new Promise(resolve => {
      const data = this.data.shift()
      if (data !== undefined) resolve(data)
      else this.once('write', () => {
        const data = this.data.shift()
        if (data !== undefined) resolve(data)
      })
    })
  }

  write(data) {
    this.data.push(data)
    this.emit('write')
  }
}

module.exports = Resource;
