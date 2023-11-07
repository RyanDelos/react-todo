import React, { useState, useEffect } from 'react';
import axios from 'axios';

const AirtableUrl = 'https://api.airtable.com/v0/appKY2p9FGeCsbeVB/todolist';

export const useAirtable = () => {
  const [records, setRecords] = useState([]);

  useEffect(() => {
    const fetchRecords = async () => {
      const response = await axios.get(AirtableUrl, {
        headers: {
          Authorization: `Bearer ${process.env.REACT_APP_AIRTABLE_API_KEY}`,
        },
      });
      setRecords(
        response.data.records.sort(function (a, b) {
          return new Date(a.createdTime) - new Date(b.createdTime);
        })
      );
    };
    fetchRecords();
  }, []);

  const createRecord = async (record) => {
    const airTableRecord = { records: [{ fields: record }] };
    await axios.post(AirtableUrl, airTableRecord, {
      headers: {
        Authorization: `Bearer ${process.env.REACT_APP_AIRTABLE_API_KEY}`,
        'Content-Type': 'application/json',
      },
    });

    const response = await axios.get(AirtableUrl, {
      headers: {
        Authorization: `Bearer ${process.env.REACT_APP_AIRTABLE_API_KEY}`,
      },
    });
    setRecords(
      response.data.records.sort(function (a, b) {
        return new Date(a.createdTime) - new Date(b.createdTime);
      })
    );
  };
  return { records, createRecord };
};
