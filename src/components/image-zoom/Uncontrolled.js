import 'focus-options-polyfill'
import React, {
  CSSProperties,
  FC,
  ReactNode,
  ReactType,
  RefObject,
  StrictMode,
  memo,
  useCallback,
  useRef,
  useState
} from 'react'
import './styles.css'
import UncontrolledActivated from './UncontrolledActivated'
import styled from 'styled-components';

const WrapElement = styled.div`
  position: relative;
  height: auto;
  cursor: default;
  @media (min-width: 979px) {
    margin: 0 12px;
    width: ${props => `${props.width}%` || '80%'};
    ${({ alignment }) => (alignment == 'left'|| alignment == 'right')  && `
      float: ${alignment};
    `}
    ${({ alignment }) => alignment == 'center' && `
      margin-left: auto;
      margin-right: auto;
      display: block;
    `}
  }
  padding: 0px;
  width: 96%;
  max-width: 480px;
  margin-left: auto;
  margin-right: auto;
  display: block;
`

const Uncontrolled = ({
  children,
  closeText = 'Unzoom image',
  overlayBgColorEnd = 'rgba(255, 255, 255, 0.95)',
  overlayBgColorStart = 'rgba(255, 255, 255, 0)',
  portalEl,
  openText = 'Zoom image',
  scrollableEl,
  transitionDuration = 300,
  // wrapElement: WrapElement = 'div',
  // wrapStyle,
  width,
  alignment,
  zoomMargin = 0,
  zoomZindex = 2147483647,
}) => {
  const [isActive, setIsActive] = useState(false)
  const [isChildLoaded, setIsChildLoaded] = useState(false)
  const wrapRef = useRef(null)
  const btnRef = useRef(null)
  const childRef = useRef(null);

  const handleClickTrigger = useCallback(
    e => {
      if (!isActive) {
        e.preventDefault()
        setIsActive(true)
      }
    },
    [isActive]
  )

  const handleChildLoad = useCallback(() => {
    setIsChildLoaded(true)
  }, [])

  const handleChildUnload = useCallback(() => {
    setIsActive(false)
    setIsChildLoaded(false)

    if (btnRef.current) {
      btnRef.current.focus({ preventScroll: true })
    }
  }, [])

  const isExpanded = isActive && isChildLoaded
  const wrapType = isExpanded ? 'hidden' : 'visible'

  return (
    <StrictMode>
      <WrapElement
        data-rmiz-wrap={wrapType}
        ref={wrapRef}
        width={width}
        alignment={alignment}
        // style={wrapStyle}
        >
        {children}
        <button
          aria-label={openText}
          data-rmiz-btn-open
          onClick={handleClickTrigger}
          ref={btnRef}
        />
        {typeof window !== 'undefined' && isActive && (
          <UncontrolledActivated
            closeText={closeText}
            onLoad={handleChildLoad}
            onUnload={handleChildUnload}
            overlayBgColorEnd={overlayBgColorEnd}
            overlayBgColorStart={overlayBgColorStart}
            parentRef={wrapRef}
            portalEl={portalEl}
            scrollableEl={scrollableEl}
            transitionDuration={transitionDuration}
            zoomMargin={zoomMargin}
            zoomZindex={zoomZindex}
            childRef={childRef}
          >
            {React.cloneElement(children, { ref: childRef } )}
          </UncontrolledActivated>
        )}
      </WrapElement>
    </StrictMode>
  )
}

export default memo(Uncontrolled)
