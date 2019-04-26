import React, { Component } from 'react'
const CryptoJS = require('crypto-js');  //引用AES源码js
import {
    Upload, message, Button, Icon,
  } from 'antd';

export default class base64 extends Component {

    state={}
    handleChange=(info)=>{
        console.log(info);
        if (info.file.status === 'uploading') {
            this.setState({ loading: true });
            return;
          }
          if (info.file.status === 'done') {
            // Get this url from response in real world.
            this.getBase64(info.file.originFileObj, imageUrl => this.setState({
              imageUrl,
              loading: false,
            }));
        }
             
      }
       getBase64=(img, callback)=> {
        const reader = new FileReader();
        reader.addEventListener('load', () => {
            console.log(reader.result);
            callback(reader.result)
        });
        reader.readAsDataURL(img);
       
      }
  render() {
    return (
      <div>
         <Upload 
         onChange={this.handleChange}
         >
            <Button>
            <Icon type="upload" /> Click to Upload
            </Button>
        </Upload>
      </div>
    )
  }
}
