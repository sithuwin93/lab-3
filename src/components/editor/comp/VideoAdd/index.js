import Button, { ButtonGroup } from '@atlaskit/button';
import Textfield from '@components/CustomTextField';
import ModalDialog, {
  ModalFooter,
  ModalTransition,
} from '@atlaskit/modal-dialog';
import Form, { Field } from '@atlaskit/form';
import VideoSvg from '@public/static/svg/Icon-Video.svg';
import { StyledModalDialog, StyledModalBody } from '@components/StyledComp';
// import EmbForm from './EmbForm';


export default (props) => {
  const { theme, videoInputOpen }  = props;
  const preventBubblingUp = e =>  e.preventDefault();

  // const onEmbClick = e => {
  //   e.preventDefault();
  //   e.stopPropagation();
  //   const { ownTheme, placeholder, onOverrideContent } = props;
  //   const content = props => (
  //     <EmbForm {...props} placeholder={placeholder} />
  //   );
  //   onOverrideContent(content);
  // }

  return (
    <div
      className={theme.buttonWrapper}
      onMouseDown={preventBubblingUp}>
      <button  
        type="button"
        className={theme.button}
        onClick={videoInputOpen}>
        <VideoSvg/>
      </button>
    </div>
  );
}

{/* 
  <div
    className={theme.buttonWrapper}
    onMouseDown={preventBubblingUp}
    onMouseDown={onEmbClick}>
    <button  
      type="button"
      className={theme.button}
      onClick={onEmbClick}>
      <VideoSvg/>
    </button>
  </div> 
*/}

export const VideoInputBox = ({
  videoOpen,videoclosePopover,videoFormSubmit
}) => {

  const videofooter = props => (
    <ModalFooter showKeyline={props.showKeyline}>
      <span />
      <ButtonGroup>
        <Button appearance="primary" type="submit">
          Submit
        </Button>
        <Button
          onClick={videoclosePopover}
          appearance="default">
          Close
        </Button>   
      </ButtonGroup>
    </ModalFooter>
  );

  return (
    <ModalTransition>        
      {videoOpen && (
        <StyledModalDialog
          heading="Enter Video Url"
          onClose={videoclosePopover}
          components={{
            Container: ({ children, className }) => (
              <StyledModalBody>
                <Form onSubmit={videoFormSubmit}>
                  {({ formProps }) => (
                    <form {...formProps} className={className}>
                      {children}
                    </form>
                  )}
                </Form>
              </StyledModalBody>
            ),
            Footer: videofooter,
          }}>
          <Field label="Video Url" name="url" defaultValue="">
            {({ fieldProps }) => <Textfield placeholder="Paste the video url …" {...fieldProps}/>}
          </Field>
        </StyledModalDialog>
      )}
    </ModalTransition>
  )
}