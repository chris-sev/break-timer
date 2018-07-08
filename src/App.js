import React, { Component } from 'react';

class App extends Component {
  state = { seconds: 0 };
  timer;

  componentWillUnmount() {
    clearInterval(this.timer);
  }

  clearTimer = ()   => clearInterval(this.timer)
  pad        = time => time < 10 ? `0${time}`: time;
  
  /**
   * --------------------------------------------------
   * Set the time and start the countdown
   * --------------------------------------------------
   */
  setTime = seconds => {
    this.setState({ seconds });

    if (this.timer === 0) {
      this.timer = setInterval(this.countDown, 1000);
    }

    this.startTimer(); 
  }

  /**
   * --------------------------------------------------
   * Start our countdown
   * --------------------------------------------------
   */
  startTimer = () => {
    if (this.timer == 0) this.timer = setInterval(this.countDown, 1000);
  }

  /**
   * --------------------------------------------------
   * Decrement our counter
   * --------------------------------------------------
   */
  countDown() {
    const seconds = this.state.seconds - 1;
    this.setState({ seconds });
    if (seconds === 0) clearInterval(this.timer);
  }

  /**
   * --------------------------------------------------
   * Convert the seconds to an actual time
   * --------------------------------------------------
   */
  secondsToTime = secs => {
    const hours    = Math.floor(secs / (60 * 60));
    const divisorM = secs % (60 * 60);
    const minutes  = Math.floor(divisorM / 60);
    const divisorS = divisorM % 60;
    const seconds  = Math.ceil(divisorS);
    return { hours: this.pad(hours), minutes: this.pad(minutes), seconds: this.pad(seconds) };
  }

  /**
   * --------------------------------------------------
   * Render it
   * --------------------------------------------------
   */
  render() {
    const time = this.secondsToTime(this.state.seconds);

    return (
      <div className="App">
        {/* timer number */} 
        <div>
          {time.hours}:{time.minutes}:{time.seconds}
        </div>

        {/* set times */}
        <a className="button" onClick={() => this.setTime(30)}>0:30</a>
        <a className="button" onClick={() => this.setTime(60)}>1:00</a>
        <a className="button" onClick={() => this.setTime(90)}>1:30</a>
      </div>
    );
  }
}

export default App;
