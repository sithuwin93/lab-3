import { ThemedButton } from 'src/components/button-new';
import Icon from 'src/components/icon';

<ThemedButton
    to={{
        pathname: '/new/thread',
        state: { modal: true },
    }}
    type="a"
    shouldFitContainer
    appearance="primary">
    <Icon 
    style={{
        position: 'relative',
        top: 6,
        left: 5,
        marginRight: 8
    }}
    glyph={'post'} 
    size={24} />
    New post
</ThemedButton>
spacing="compact"