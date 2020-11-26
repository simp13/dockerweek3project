import React, { Component } from 'react';
import axios from "axios";

class Recognize extends Component {

  constructor(props) {
    super(props);

  }

  componentDidMount() {
    document.title = "Recognize"
  }

  onChange = (e) => {
    if (e.target.files != null) {
      console.log("File to upload:=>", e.target.files[0])
      let file = e.target.files[0]
      if (file) {
        const reader = new FileReader();
        reader.onload = this._handleFileReaderLoaded.bind(this)
        reader.readAsBinaryString(file)
      }
    }
  }

  _handleFileReaderLoaded = (readerEvt) => {
    let binaryString = readerEvt.target.result
    this.setState({
      base64TextString: btoa(binaryString)
    })
    const preview = document.getElementById("preview");
    preview.src = "data:image/png;base64," + this.state.base64TextString
  }

  onFileSubmit = (e) => {
    e.target.reset();
    e.preventDefault();

    axios
      .post('/api/recognize/', {
        face: this.state.base64TextString,
      })
      .then((result) => {
        console.log(result);
        alert(result.data.names[0]);

      })
      .catch((error) => {

        if (error.response.status === 400) {
          alert("Error");
        } else {
          alert("Unknown error.");
        }
      });

    
      
  }

  render() {
    return (
      <div>
        <h2>Recognize</h2>
        <form onSubmit={(e) => this.onFileSubmit(e)} onChange={(e) => this.onChange(e)}>
          <input type="file" name="image" id="file" accept=".jpeg,.png,.jpg" />
          <input type="submit" value="Send" />
        </form>
        <img src="" id="preview" />
      </div>
    );
  }
}

export default Recognize;