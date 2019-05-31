import React, { Component } from 'react';
import Dropzone from 'react-dropzone';
import './style.scss';

class ReceiptsDropzone extends Component {
  onDrop = acceptedFiles => {
    const { input } = this.props;
    input.onChange(acceptedFiles);
  };

  render() {
    const maxSize = 100485768;
    console.log('files props', this.props);

    return (
      <div className="receipts-dropzone">
        <Dropzone
          onDrop={this.onDrop}
          accept="image/png, image/jpeg"
          minSize={0}
          maxSize={maxSize}
          multiple={false}
        >
          {({
            getRootProps,
            getInputProps,
            isDragActive,
            isDragReject,
            rejectedFiles,
            acceptedFiles
          }) => {
            const isFileTooLarge =
              rejectedFiles.length > 0 && rejectedFiles[0].size > maxSize;
            console.log('get input props', getInputProps());
            return (
              <div {...getRootProps()} className="receipts-dropzone__content">
                <ul className="list-group mt-2">
                  {acceptedFiles.length > 0 &&
                    acceptedFiles.map(acceptedFile => (
                      <li
                        className="list-group-item list-group-item-success"
                        key={acceptedFile.path}
                      >
                        {acceptedFile.name}
                      </li>
                    ))}
                </ul>
                <input {...getInputProps()} name="receipt" />
                {!isDragActive && (
                  <ion-icon
                    size="large"
                    name="add"
                    className="receipts-dropzone__content--icon"
                  />
                )}
                {isDragActive && !isDragReject && 'Drop it like its hot!'}
                {isDragReject && 'File type not accepted, sorry!'}
                {isFileTooLarge && (
                  <div className="text-danger mt-2">File is too large</div>
                )}
              </div>
            );
          }}
        </Dropzone>
      </div>
    );
  }
}
export default ReceiptsDropzone;
