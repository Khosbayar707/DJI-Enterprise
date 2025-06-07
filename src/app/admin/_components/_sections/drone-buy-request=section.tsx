'use client';
import { useEffect, useState } from 'react';
import axios from 'axios';
import LoadingText from '../loading';
import { CustomDroneBuyRequest } from '@/lib/types';
import DroneBuyRequestCard from '../_cards/drone-buy-request-card';

const DroneBuyRequestSection = () => {
  const [requests, setRequests] = useState<CustomDroneBuyRequest[]>([]);
  const [refresh, setRefresh] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await axios.get('/api/users/drone-buy-request');
        if (res.data.success) {
          setRequests(res.data.data.users);
        }
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, [refresh]);

  return (
    <div className=" flex flex-col gap-6">
      {loading ? (
        <LoadingText />
      ) : (
        <DroneBuyRequestCard requests={requests} setRefresh={setRefresh} />
      )}
    </div>
  );
};

export default DroneBuyRequestSection;
