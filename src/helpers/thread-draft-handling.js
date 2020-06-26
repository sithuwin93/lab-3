// @flow
import {
  convertToRaw,
  convertFromRaw,
  EditorState,
} from 'draft-js';
const LS_BODY_KEY = 'last-plaintext-thread-composer-body';
const LS_TITLE_KEY = 'last-plaintext-thread-composer-title';
const LS_COMPOSER_EXPIRE = 'last-plaintext-thread-composer-expire';

const ONE_DAY = (): string => {
  const time = new Date().getTime() + 60 * 60 * 24 * 1000;
  return time.toString();
};

export const getDraftThread = (): { title?: string, body?: string } => {
  if (!localStorage) return {};

  try {
    const expireTime = localStorage.getItem(LS_COMPOSER_EXPIRE);
    const currTime = new Date().getTime().toString();

    if (expireTime && currTime > expireTime) {
      clearDraftThread();
      return {};
    }

    let newbody;
    const content = localStorage.getItem(LS_BODY_KEY);

    if (content) {
      newbody = EditorState.createWithContent(convertFromRaw(JSON.parse(content)));
    } else {
      newbody = EditorState.createEmpty();
    }
  
    return {
      body: newbody,
      title: localStorage.getItem(LS_TITLE_KEY) || '',
    };
  } catch (err) {
    console.error(err);
    return {};
  }
};

export const clearDraftThread = (): void => {
  if (!localStorage) return;

  try {
    localStorage.removeItem(LS_BODY_KEY);
    localStorage.removeItem(LS_TITLE_KEY);
    localStorage.removeItem(LS_COMPOSER_EXPIRE);
  } catch (err) {
    console.error(err);
  }
};

export const storeDraftThread = (input: ?{ title?: string, body?: string }) => {
  if (!input || !localStorage) return;
  try {
    if (typeof input.title === 'string')
      localStorage.setItem(LS_TITLE_KEY, input.title);
    // if (typeof input.body === 'string')
    if(typeof input.body === 'object'){
      const contentState = input.body.getCurrentContent();
      localStorage.setItem(LS_BODY_KEY, JSON.stringify(convertToRaw(contentState)));
    }
    localStorage.setItem(LS_COMPOSER_EXPIRE, ONE_DAY());
  } catch (err) {
    console.error(err);
  }
};
