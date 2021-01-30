import React from 'react';
import { Doughnut } from 'react-chartjs-2';

// shows a graph of each successfull fetch request made by user
export const RequestGraph = (props) => {
  const { reqAmountConverter, reqAmountHistory, reqAmountLatest } = props;

  const data = {
    datasets: [
      {
        data: [reqAmountConverter, reqAmountHistory, reqAmountLatest],
        backgroundColor: ['#391970', '#062a5c', '#386f78'],
      },
    ],
    labels: ['Converter', 'History', 'Latest'],
  };
  const options = {
    scales: {
      scalable: true,
    },
    title: {
      display: true,
      text: `${
        reqAmountConverter + reqAmountHistory + reqAmountLatest
      } Requests made to API endpoints`,
    },
  };

  return (
    <>
      <Doughnut data={data} options={options} />
    </>
  );
};
