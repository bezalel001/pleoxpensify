import React, { Component } from 'react';
import Dropzone from 'react-dropzone';

import './style.scss';

class ReceiptsDropzone extends Component {
  state = {
    showIcon: true,
    showfileName: true
  };

  onDrop = acceptedFiles => {
    const { input } = this.props;
    input.onChange(acceptedFiles);
    this.setState({ showIcon: false, showfileName: true });
  };

  removeFile = () => {
    const { input } = this.props;

    input.onChange('');
    this.setState({ showIcon: true, showfileName: false });
  };

  render() {
    const { showIcon, showfileName } = this.state;
    const maxSize = 500485768;

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

            return (
              <div {...getRootProps()} className="receipts-dropzone__content">
                <ul className="receipts-dropzone__content--list-group list-group mt-2">
                  {acceptedFiles.length > 0 &&
                    acceptedFiles.map(
                      acceptedFile =>
                        showfileName && (
                          <li
                            className="receipts-dropzone__content--list-group-item list-group-item"
                            key={acceptedFile.path}
                          >
                            {acceptedFile.name}{' '}
                          </li>
                        )
                    )}
                </ul>
                <input {...getInputProps()} name="receipt" />
                {(!isDragActive &&
                  !isDragReject &&
                  !(acceptedFiles.length >= 0)) ||
                  (showIcon && (
                    <ion-icon
                      size="large"
                      name="add"
                      className="receipts-dropzone__content--icon"
                    />
                  ))}

                {isDragActive && !isDragReject && 'Drop it like its hot!'}
                {isDragReject && 'File type not accepted, sorry!'}
                {isFileTooLarge && (
                  <div className="text-danger mt-2">File is too large</div>
                )}
              </div>
            );
          }}
        </Dropzone>
        <div className="receipts-dropzone__remove-file">
          {showfileName && !showIcon && (
            <ion-icon name="close" onClick={this.removeFile} />
          )}
        </div>
      </div>
    );
  }
}
export default ReceiptsDropzone;
