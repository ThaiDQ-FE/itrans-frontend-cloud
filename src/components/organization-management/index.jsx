import React, { useState } from "react";
import "./styles.scss";
import FilterOrganizationComponent from "./filter-organization";
import OrganizationListComponent from "./card-organization";
function OrganizationManagementComponent(props) {
  const [selectedStage, setSelectedStage] = useState([]);
  const [selectedS, setSelectedS] = useState([]);
  const [selectedR, setSelectedR] = useState([]);
  const [selectedP, setSelectedP] = useState([]);
  const [selectedI, setSelectedI] = useState([]);
  const [selectedRegion, setSelectedRegion] = useState([]);
  const [selectedProvince, setSelectedProvince] = useState([]);
  const [selectedIndustry, setSelectedIndustry] = useState([]);
  return (
    <>
      <FilterOrganizationComponent
        selectedStage={selectedStage}
        selectedRegion={selectedRegion}
        selectedProvince={selectedProvince}
        selectedIndustry={selectedIndustry}
        setSelectedStage={setSelectedStage}
        setSelectedRegion={setSelectedRegion}
        setSelectedProvince={setSelectedProvince}
        setSelectedIndustry={setSelectedIndustry}
        selectedS={selectedS}
        selectedR={selectedR}
        selectedP={selectedP}
        selectedI={selectedI}
        setSelectedS={setSelectedS}
        setSelectedR={setSelectedR}
        setSelectedP={setSelectedP}
        setSelectedI={setSelectedI}
      />
      <hr className="omc__hr" />
      <OrganizationListComponent
        selectedStage={selectedStage}
        selectedRegion={selectedRegion}
        selectedProvince={selectedProvince}
        selectedIndustry={selectedIndustry}
      />
    </>
  );
}

export default OrganizationManagementComponent;
