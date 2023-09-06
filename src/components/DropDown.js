import React, { useState } from 'react';
import DropDownPicker from 'react-native-dropdown-picker';
import { ArrowDownIcon, ArrowUpIcon } from '../../assets/svgs/CatalogSvgs';
import { AppColors } from '../styles/AppColors';
import { Styles } from '../styles/Styles';

export default function DropDown({
    value,
    setValue,
    placeholder
}) {
    const [items, setItems] = useState([
        { label: 'Москва1', value: 0 },
        { label: 'Москва', value: 1 }
    ]);
    const [open, setOpen] = useState(false)
    
}
