'use client';

import { useState } from 'react';
import CategoriesSection from '../_cards/categories-card';
import DroneCard from '../_cards/drone-card';
import SpecCard from '../_cards/spec-card';
import { FormControlLabel, Radio, RadioGroup } from '@mui/material';
import GarminProductTable from '../../garmin/_components/GarminProductTable';
import DronePayloadTable from '../../payloads/_components/PayloadTable';
import SurveyProductTable from '../../equipments/_components/EquipmentProductTable';

const ProductSection = () => {
  const [menu, setMenu] = useState('drone');

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setMenu(event.target.value);
  };

  return (
    <div className="flex flex-col gap-6">
      <div>
        <RadioGroup row value={menu} onChange={handleChange}>
          <FormControlLabel label="Дрон" value="drone" control={<Radio />} />
          <FormControlLabel label="Гармин" value="garmin" control={<Radio />} />
          <FormControlLabel label="Payload" value="payload" control={<Radio />} />
          <FormControlLabel label="Геодезийн багаж" value="equipments" control={<Radio />} />
          <FormControlLabel label="Эд анги" value="spec" control={<Radio />} />
          <FormControlLabel label="Категори" value="categories" control={<Radio />} />
        </RadioGroup>
      </div>

      {menu === 'categories' && <CategoriesSection />}
      {menu === 'drone' && <DroneCard />}
      {menu === 'payload' && <DronePayloadTable />}
      {menu === 'equipments' && <SurveyProductTable />}
      {menu === 'spec' && <SpecCard />}
      {menu === 'garmin' && <GarminProductTable />}
    </div>
  );
};

export default ProductSection;
