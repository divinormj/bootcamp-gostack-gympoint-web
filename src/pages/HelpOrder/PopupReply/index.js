import React from 'react';
import PropTypes from 'prop-types';
import Modal from '@material-ui/core/Modal';
import IconButton from '@material-ui/core/IconButton';
import CloseIcon from '@material-ui/icons/Close';
import { Form, Input } from '@rocketseat/unform';

import { Container, Close, Question } from './styles';

export default function PopupReply({ open, help, handleClose, handleSubmit }) {
  return (
    <Modal
      open={open}
      onBackdropClick={handleClose}
      onEscapeKeyDown={handleClose}
    >
      <Container>
        <Form initialData={help} onSubmit={handleSubmit}>
          <Close>
            <IconButton aria-label="close" onClick={handleClose}>
              <CloseIcon />
            </IconButton>
          </Close>
          <Question>
            <strong>PERGUNTA DO ALUNO</strong>
            <span>{help.question}</span>
            <strong>SUA RESPOSTA</strong>
            <Input autoFocus name="answer" multiline rows="5" />
            <button type="submit">Responder aluno</button>
          </Question>
        </Form>
      </Container>
    </Modal>
  );
}

PopupReply.propTypes = {
  open: PropTypes.bool.isRequired,
  help: PropTypes.element.isRequired,
  handleClose: PropTypes.func.isRequired,
  handleSubmit: PropTypes.func.isRequired,
};
