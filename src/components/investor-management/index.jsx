import React, { useState } from "react";
import "./styles.scss";
import FilterInvestorComponent from "./filter-investor";
import CardInvestorComponent from "./card-investor";
function InvestorManagementComponent(props) {
  const [amount, setAmount] = useState("");
  const [selectedHead, setSelectedHead] = useState([]);
  const [selectedH, setSelectedH] = useState([]);
  const [selectedIndustry, setSelectedIndustry] = useState([]);
  const [selectedIn, setSelectedIn] = useState([]);
  const [selectedProvince, setSelectedProvince] = useState([]);
  const [selectedP, setSelectedP] = useState([]);
  const [selectedStage, setSelectedStage] = useState([]);
  const [selectedS, setSelectedS] = useState([]);
  const [selectedType, setSelectedType] = useState([]);
  const [selectedT, setSelectedT] = useState([]);
  const handleChangeAmount = (event) => {
    const { value } = event.target;
    setAmount(value);
  };
  console.log(
    selectedHead,
    selectedIndustry,
    selectedProvince,
    selectedStage,
    selectedType
  );
  return (
    <>
      <FilterInvestorComponent
        amount={amount}
        selectedHead={selectedHead}
        selectedH={selectedH}
        selectedIndustry={selectedIndustry}
        selectedIn={selectedIn}
        selectedStage={selectedStage}
        selectedS={selectedS}
        selectedProvince={selectedProvince}
        selectedP={selectedP}
        selectedType={selectedType}
        selectedT={selectedT}
        //
        setAmount={setAmount}
        setSelectedHead={setSelectedHead}
        setSelectedH={setSelectedH}
        setSelectedIndustry={setSelectedIndustry}
        setSelectedIn={setSelectedIn}
        setSelectedP={setSelectedP}
        setSelectedStage={setSelectedStage}
        setSelectedS={setSelectedS}
        setSelectedProvince={setSelectedProvince}
        setSelectedType={setSelectedType}
        setSelectedT={setSelectedT}
        //
        handleChangeAmount={handleChangeAmount}
      />
      <hr className="imc__hr" />
      <CardInvestorComponent
        selectedHead={selectedHead}
        selectedIndustry={selectedIndustry}
        selectedStage={selectedStage}
        selectedProvince={selectedProvince}
        selectedType={selectedType}
      />
    </>
  );
}

export default InvestorManagementComponent;
