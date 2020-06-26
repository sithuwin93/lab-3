import { Component } from 'react';
import Button, { ButtonGroup } from '@atlaskit/button';
import Textfield from '@components/CustomTextField';
import ModalDialog, {
  ModalFooter,
  ModalTransition,
} from '@atlaskit/modal-dialog';
import Form, { Field } from '@atlaskit/form';
import ProgressBar, { SuccessProgressBar } from '@atlaskit/progress-bar';
import ImageSvg from '@public/static/svg/Icon-Image.svg'
import UploadIcon from '@atlaskit/icon/glyph/upload';
import { StyledModalDialog, StyledModalBody } from '@components/StyledComp';

export default ({ theme, imageInputOpen,fileInput, handleUpload }) => {
  const preventBubblingUp = e => e.preventDefault();
  return (
    <div
      className={theme.buttonWrapper}
      onMouseDown={preventBubblingUp}>
      <button  
        type="button"
        className={theme.button}
        onClick={imageInputOpen}>
        <ImageSvg/>
      </button>
      <input
        onChange={handleUpload} 
        ref={fileInput} 
        type="file"
        multiple={false}
        style={{
          width:0, 
          height:0,
          overflow:'hidden',
          opacity:0,
          zIndex: -1,
          position: 'absolute'
        }}/>
    </div>
  );
}

export class ImageUploadBox extends Component {

  render() {
    const {
      uploading,
      imageclosePopover,
      imageUploadCompleted,
    } = this.props;

    return (
      <ModalTransition>
      {uploading && (
        <StyledModalDialog
          heading="Uploading..."
          onClose={imageclosePopover}
          components={{
            Container: ({ children, className }) => (
              uploading &&
              <StyledModalBody>
                {children}
              </StyledModalBody>
            ),
          }}>
            <div style={{padding:'20px 20px 40px 20px'}}>
              {imageUploadCompleted === 1 ? 
                <SuccessProgressBar value={1} />:
                <ProgressBar value={imageUploadCompleted} />
              }              
            </div>                
        </StyledModalDialog>
      )}
    </ModalTransition> 
    )
  }
}