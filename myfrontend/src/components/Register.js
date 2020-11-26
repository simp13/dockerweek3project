import React, { Component } from 'react';
import axios from "axios";

class Register extends Component {

  constructor(props) {
    super(props);
    this.state = { name: '' };
  }

  componentDidMount() {
    document.title = "Register"
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

  handleNameChange = (e) => {
    this.setState({ name: e.target.value });

  }


  onFileSubmit = (e) => {
    document.getElementById("uname").value = "";
    console.log(this.state.name);
    e.preventDefault();
    axios
      .post('/api/register/', {
        name: this.state.name,
        face: this.state.base64TextString,
      })
      .then((result) => {
        console.log(result);
        alert(result.data.success);

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
        <h2>Register</h2>
        <form onSubmit={(e) => this.onFileSubmit(e)} onChange={(e) => this.onChange(e)}>
          <input type="file" name="image" id="file" accept=".jpeg,.png,.jpg" />
          <input type="text" name="name" id="uname" placeholder="Name" value={this.state.name} onChange={(e) => this.handleNameChange(e)} />
          <input type="submit" value="Send" />
        </form>
        <img src="" id="preview" />
      </div>
    );
  }
}

export default Register;