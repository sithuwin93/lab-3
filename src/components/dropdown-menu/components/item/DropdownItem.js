// @flow

import Item, { withItemFocus, withItemClick } from 'src/components/item';

export default withItemClick(withItemFocus(Item));
