import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './style.css';
import Table from './Table';
import paginationFactory from 'react-bootstrap-table2-paginator';
import { Modal, Button } from 'react-bootstrap';

export default function App() {
  const [posts, setPosts] = useState([]);
  const [modalInfo, setModalInfo] = useState([]);
  const [showModal, setShowModal] = useState(false);

  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const columns = [
    { dataField: 'id', text: 'Id' },
    { dataField: 'title', text: 'Title' },
    { dataField: 'body', text: 'Cotent' },
  ];
  const getData = async () => {
    await axios
      .get('https://jsonplaceholder.typicode.com/posts')
      .then((response) => {
        setPosts(response.data);
      });
  };

  useEffect(() => {
    getData();
  }, []);

  const rowEvents = {
    onClick: (e, row) => {
      console.log(row, 'row');
      setModalInfo(row);
      handleToggle();
    },
  };

  const handleToggle = () => {
    setShowModal(handleShow);
  };

  const ModalContent = () => {
    return (
      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>{modalInfo.title}</Modal.Title>
        </Modal.Header>
        <Modal.Body>{modalInfo.body}</Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>
    );
  };

  return (
    <div>
      <Table
        data={posts}
        columns={columns}
        pagination={paginationFactory()}
        rowEvents={rowEvents}
      />
      {show && <ModalContent />}
    </div>
  );
}
