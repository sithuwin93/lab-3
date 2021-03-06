// @flow
import * as React from 'react';
import compose from 'recompose/compose';
import { connect } from 'react-redux';
import Textarea from 'react-textarea-autosize';
import { addToastWithTimeout } from 'src/actions/toasts';
import Icon from 'src/components/icon';
import isEmail from 'validator/lib/isEmail';
import sendCommunityEmailInvitations from 'shared/graphql/mutations/community/sendCommunityEmailInvites';
// import { OutlineButton } from 'src/components/button';
import { ThemedButton } from 'src/components/button-new';

import { Error } from '../formElements';
import { SectionCardFooter } from 'src/components/settingsViews/style';
import { withCurrentUser } from 'src/components/withCurrentUser';
import {
  EmailInviteForm,
  EmailInviteInput,
  Action,
  ActionAsLabel,
  ActionHelpText,
  RemoveRow,
  CustomMessageTextAreaStyles,
  HiddenInput,
} from './style';
import { withTranslation } from 'react-i18next';
import i18n from 'i18next';

type Props = {
  id: string,
  dispatch: Dispatch<Object>,
  currentUser: Object,
  sendEmailInvites: Function,
  t: i18n.TFunction
};

type ContactProps = {
  email: string,
  firstName: string,
  lastName: string,
  error: boolean,
};

type State = {
  isLoading: boolean,
  contacts: Array<ContactProps>,
  importError: string,
  hasCustomMessage: boolean,
  customMessageString: string,
  customMessageError: boolean,
  inputValue: ?string,
};

class EmailInvitationForm extends React.Component<Props, State> {
  constructor(props) {
    super(props);

    this.state = {
      isLoading: false,
      importError: '',
      contacts: [
        {
          email: '',
          firstName: '',
          lastName: '',
          error: false,
        },
        {
          email: '',
          firstName: '',
          lastName: '',
          error: false,
        },
        {
          email: '',
          firstName: '',
          lastName: '',
          error: false,
        },
      ],
      hasCustomMessage: false,
      customMessageString: '',
      customMessageError: false,
      inputValue: '',
    };
  }

  getUniqueEmails = array => array.filter((x, i, a) => a.indexOf(x) === i);

  sendInvitations = () => {
    const {
      contacts,
      hasCustomMessage,
      customMessageError,
      customMessageString,
    } = this.state;
    const { dispatch, currentUser, sendEmailInvites } = this.props;

    this.setState({ isLoading: true });

    let validContacts = contacts
      .filter(contact => !contact.error)
      .filter(contact => contact.email !== currentUser.email)
      .filter(contact => contact.email.length > 0)
      .filter(contact => isEmail(contact.email))
      // eslint-disable-next-line
      .map(({ error, ...contact }) => {
        return { ...contact };
      });

    let customMessage =
      hasCustomMessage && !customMessageError ? customMessageString : null;

    // make sure to uniqify the emails so you can't enter on email multiple times
    validContacts = this.getUniqueEmails(validContacts);

    if (validContacts.length === 0) {
      this.setState({
        isLoading: false,
      });

      return dispatch(
        addToastWithTimeout('error', t('newCommunity:InviteYourSlackTeamToYourCommunity'))
      );
    }

    sendEmailInvites({
      id: this.props.id,
      contacts: validContacts,
      customMessage,
    })
      .then(() => {
        this.setState({
          isLoading: false,
          contacts: [
            {
              email: '',
              firstName: '',
              lastName: '',
              error: false,
            },
            {
              email: '',
              firstName: '',
              lastName: '',
              error: false,
            },
            {
              email: '',
              firstName: '',
              lastName: '',
              error: false,
            },
          ],
          hasCustomMessage: false,
          customMessageString: '',
          customMessageError: false,
        });

        return dispatch(
          addToastWithTimeout(
            'success',
            `Invitations sent to ${
              validContacts.length > 1
                ? `${validContacts.length} people`
                : `${validContacts.length} person`
            }!`
          )
        );
      })
      .catch(err => {
        this.setState({
          isLoading: false,
        });
        dispatch(addToastWithTimeout('error', err.message));
      });
  };

  handleChange = (e, i, key) => {
    const { contacts } = this.state;
    contacts[i][key] = e.target.value;

    this.setState({
      ...this.state,
      contacts,
    });
  };

  addRow = () => {
    const { contacts } = this.state;
    contacts.push({
      email: '',
      firstName: '',
      lastName: '',
      error: false,
    });

    this.setState({
      ...this.state,
      contacts,
    });
  };

  removeRow = index => {
    const { contacts } = this.state;
    contacts.splice(index, 1);
    this.setState({
      ...this.state,
      contacts,
    });
  };

  validate = (e, i) => {
    const { contacts } = this.state;
    if (!isEmail(e.target.value)) {
      contacts[i].error = true;
    } else {
      contacts[i].error = false;
    }

    this.setState({
      ...this.state,
      contacts,
    });
  };

  handleCustomMessageChange = e => {
    const customMessageString = e.target.value;
    if (customMessageString.length > 500) {
      this.setState({
        customMessageString,
        customMessageError: true,
      });
    } else {
      this.setState({
        customMessageString,
        customMessageError: false,
      });
    }
  };

  toggleCustomMessage = () => {
    const { hasCustomMessage } = this.state;
    this.setState({
      hasCustomMessage: !hasCustomMessage,
    });
  };

  handleFile = evt => {
    this.setState({
      importError: '',
    });

    // Only show loading indicator for large files
    // where it takes > 200ms to load
    const timeout = setTimeout(() => {
      this.setState({
        isLoading: true,
      });
    }, 200);

    const reader = new FileReader();
    reader.onload = file => {
      clearTimeout(timeout);
      this.setState({
        isLoading: false,
      });

      let parsed;
      try {
        if (typeof reader.result !== 'string') return;
        parsed = JSON.parse(reader.result);
      } catch (err) {
        this.setState({
          importError: t('newCommunity:OnlyJsonFilesAreSupportedForImport'),
        });
        return;
      }

      if (!Array.isArray(parsed)) {
        this.setState({
          importError:
            'Your JSON data is in the wrong format. Please provide either an array of emails ["hi@me.com"] or an array of objects with an "email" property and (optionally) a "name" property [{ "email": "hi@me.com", "name": "Me" }].',
        });
        return;
      }

      const formatted = parsed.map(value => {
        if (typeof value === 'string')
          return {
            email: value,
          };

        return {
          email: value.email,
          firstName: value.firstName || value.name,
          lastName: value.lastName,
        };
      });

      const validated = formatted
        .map(value => {
          if (!isEmail(value.email)) return { ...value, error: true };
          return value;
        })
        .filter(Boolean);

      if (validated.length > 5000) {
        this.setState({
          importError: t('newCommunity:CannotInviteMoreThan5000Emails'),
        });
        return;
      }

      const consolidated = [
        ...this.state.contacts.filter(
          contact =>
            contact.email.length > 0 ||
            contact.firstName.length > 0 ||
            contact.lastName.length > 0
        ),
        ...validated,
      ];

      const unique = consolidated.filter(
        (obj, i) =>
          consolidated.findIndex(a => a['email'] === obj['email']) === i
      );

      this.setState({
        contacts: unique,
        inputValue: '',
      });
    };

    reader.readAsText(evt.target.files[0]);
  };

  render() {
    const {
      contacts,
      isLoading,
      hasCustomMessage,
      customMessageString,
      customMessageError,
      importError,
    } = this.state;
    const { t } = this.props;
    return (
      <div>
        {importError && <Error>{importError}</Error>}
        {contacts.map((contact, i) => {
          return (
            <EmailInviteForm key={i}>
              <EmailInviteInput
                error={contact.error}
                type="email"
                onBlur={e => this.validate(e, i)}
                placeholder="Email address"
                value={contact.email}
                onChange={e => this.handleChange(e, i, 'email')}
              />
              <EmailInviteInput
                type="text"
                placeholder="First name (optional)"
                value={contact.firstName}
                onChange={e => this.handleChange(e, i, 'firstName')}
                hideOnMobile
              />
              <RemoveRow onClick={() => this.removeRow(i)}>
                <Icon glyph="view-close" size="16" />
              </RemoveRow>
            </EmailInviteForm>
          );
        })}

        <Action onClick={this.addRow}>
          <Icon glyph="plus" size={20} /> Add row
        </Action>
        <ActionAsLabel mb="8px">
          <HiddenInput
            value={this.state.inputValue}
            type="file"
            accept=".json"
            onChange={this.handleFile}
          />
          <Icon size={20} glyph="upload" /> Import emails
        </ActionAsLabel>
        <ActionHelpText>
          Upload a .json file with an array of up to 5,000 email addresses.
        </ActionHelpText>

        <Action onClick={this.toggleCustomMessage}>
          <Icon glyph={hasCustomMessage ? 'view-close' : 'post'} size={20} />
          {hasCustomMessage
            ? 'Remove custom message'
            : 'Optional: Add a custom message to your invitation'}
        </Action>

        {hasCustomMessage && (
          <Textarea
            autoFocus
            value={customMessageString}
            placeholder="Write something sweet here..."
            style={{
              ...CustomMessageTextAreaStyles,
              border: customMessageError
                ? '2px solid #E3353C'
                : '2px solid #DFE7EF',
            }}
            onChange={this.handleCustomMessageChange}
          />
        )}

        {hasCustomMessage && customMessageError && (
          <Error>
            Your custom invitation message can be up to 500 characters.
          </Error>
        )}

        <SectionCardFooter>
          {/* <OutlineButton
            loading={isLoading}
            onClick={this.sendInvitations}
            disabled={hasCustomMessage && customMessageError}
          >
            {isLoading ? 'Sending...' : 'Send Invitations'}
          </OutlineButton> */}
          <ThemedButton 
            isLoading={isLoading}
            onClick={this.sendInvitations}
            isDisabled={hasCustomMessage && customMessageError}>
            {isLoading ? t('Sending') : t('SendInvitations')}
          </ThemedButton>
        </SectionCardFooter>
      </div>
    );
  }
}

export const CommunityInvitationForm = compose(
  withCurrentUser,
  sendCommunityEmailInvitations,
  connect()
)(withTranslation(['common','newCommunity'])(EmailInvitationForm));
