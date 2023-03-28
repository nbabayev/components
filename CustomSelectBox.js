import React, { useState, useEffect } from 'react';
import "./customSelectBox.css"
// import arrowDown from "../../assets/arrow-down.svg"

const SelectBox = (props) => {
    const { placeholder, multiple, data } = props;
    const [selectboxView, setSelectboxView] = useState(false);
    const [selected, setSelected] = useState({
        id: "",
        name: placeholder
    });
    const [multiSelected, setMultiSelected] = useState([
        {
            id: "",
            name: placeholder
        }
    ]);
    const [selectedColor, setSelectedColor] = useState(false);
    const [selectedItems, setSelectedItems] = useState([]);

    const handleSelectBox = () => {
        setSelectboxView(!selectboxView);
    }

    const handleSelectedItem = (event) => {
        let { name, id } = event.target;
        setSelected({ ...selected, id, name });
    }
    const handleMultipleSelectedItem = (event) => {
        let { name, id } = event.target;
        if (name && id) {
            setSelectedColor(true);
        }
        if (multiSelected[0] && multiSelected[0]?.name === placeholder) multiSelected.pop();
        if (multiSelected.every(ms => ms.id !== id)) {
            setSelectedItems([...selectedItems, +id])
            setMultiSelected([...multiSelected, { name, id }]);
        } else {
            let thisobj = multiSelected.find(ms => ms.id == id);
            let index = multiSelected.indexOf(thisobj);
            if (index != -1) {
                let rest = multiSelected.splice(index, 1);
                setMultiSelected(multiSelected);
            }
        }
    }

    return (
        <div>
            <div className="select_box_holder">
                <div className='select_box_handler' onClick={handleSelectBox}>
                    {
                        multiple ?
                            <span>
                                {
                                    multiSelected?.map(({ name, id }) => (
                                        <span key={id}>{multiSelected.length > 1 ? `${name}, ` : name}</span>
                                    ))
                                }
                            </span> : selected.name + 1

                    }
                    {/* <span>{multiple ? multiSelected : selected.name}</span> */}
                    {/* <img src={arrowDown} alt="" /> */}
                </div>
                {
                    selectboxView &&
                    <ul className='select_box'>
                        {
                            data.length > 0 && data.map(({ value, label }) => (
                                <li id={value} key={value}>
                                    <button
                                        className={`select_box_item ${selectedItems.includes(value) && 'selected'}`}
                                        id={value}
                                        name={label}
                                        onClick={multiple ? handleMultipleSelectedItem : handleSelectedItem}>
                                        {label}
                                    </button>
                                </li>
                            ))
                        }
                    </ul>
                }
            </div>
        </div>
    )
}

export default SelectBox