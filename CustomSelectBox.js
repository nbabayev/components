import React, { useState, useEffect } from 'react';
import "./selectbox.css"
import arrowDown from "../../icons/Temporary/arrowDown.svg"
import arrowUp from "../../icons/Temporary/arrowUp.svg"

const SelectBox = (props) => {
    const { placeholder, multiple, data, setResult } = props;
    const [selectboxView, setSelectboxView] = useState(false);
    const [selected, setSelected] = useState([{ id: "-", name: placeholder }]);
    const [selectedItems, setSelectedItems] = useState([]);

    const handleDefaultValue = (e) => {
        let { id } = e.target;
        setSelected([{ id, name: placeholder }]);
        setSelectedItems([]);
    }

    const handleMultipleSelectedItem = (event) => {
        let { name, id } = event.target;
        if (selected[0] && selected[0]?.id === "-") selected.pop();
        if (multiple) {
            if (selected.every(ms => ms.id !== id)) {
                setSelectedItems([...selectedItems, +id]);
                setSelected([...selected, { name, id }]);
            } else {
                let thisobj = selected.find(ms => ms.id == id);
                if (thisobj !== undefined) {
                    let index = selected.indexOf(thisobj);
                    selected.splice(index, 1);
                    setSelected(selected);
                    setSelectedItems(selected.map(ms => +ms?.id));
                }
            }
        }
        else {
            setSelected([{ name, id }]);
            setSelectedItems([+id]);
        }
    }
    useEffect(() => setResult(selectedItems), [selectedItems]);

    return (
        <div>
            <div className="select_box_holder">
                <div className='select_box_handler' onClick={() => setSelectboxView(!selectboxView)}>
                    {
                        selected.length > 0 ?
                            <span>
                                {
                                    selected?.map(({ name, id }) => (
                                        <span key={id}>{selected.length > 1 ? `${name}, ` : name}</span>
                                    ))
                                }
                            </span> : placeholder
                    }
                    {selectboxView ?
                        <img src={arrowUp} alt="" /> :
                        <img src={arrowDown} alt="" />
                    }
                </div>
                {
                    selectboxView &&
                    <ul className='select_box' style={data?.length > 5 ? scrollStyle : {}}>
                        <li>
                            <button
                                className={`select_box_item ${!selectedItems.length ? 'selected' : ""}`}
                                id="-"
                                name={placeholder}
                                onClick={(e) => handleDefaultValue(e)}
                            >
                                {"Select"}
                            </button>
                        </li>
                        {
                            data.length > 0 && data.map(({ key, text, value }) => (
                                <li id={value} key={key}>
                                    <button
                                        className={`select_box_item ${selectedItems.includes(value) ? 'selected' : ""}`}
                                        id={value}
                                        name={text}
                                        onClick={handleMultipleSelectedItem}>
                                        {text}
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

export default SelectBox;


const scrollStyle = { height: "120px", overflowY: "scroll" }