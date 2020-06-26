import CodeBlockSvg from '@public/static/svg/Icon-CodeBlock.svg'
import createInlineStyleButton from 'draft-js-buttons/lib/utils/createInlineStyleButton';

export default createInlineStyleButton({
  style: 'code-block',
  children: (
    <CodeBlockSvg/>
  ),
});
