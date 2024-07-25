import React, { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { read, utils } from "xlsx";
import Sort from "../assets/images/Vector.svg";

const column = [
  "S. No.",
  "Farmer Code",
  "Farmer Name",
  "Date of Registration",
  "Village",
  "Tehsil",
  "State",
  "Survey No. ",
  "Total Area ",
  "Organic Area [in Hectare]",
  "Area (in Hectare)",
  "Est. Yield (in MT )",
  "CO2 Emission",
];

const Demo = ({ url }) => {
  const [data, setData] = useState([]);
  const [season, setSeason] = useState("");
  const [icsName, setIcsName] = useState("");
  const [icsAddress, setIcsAddress] = useState("");
  const [cottonYield, setCottonYield] = useState("");
  const [CO2Emission, setCO2Emission] = useState("");
  const [totalOrganicArea, setTotalOrganicArea] = useState("");
  const [totalOrganicAreaCotton, setTotalOrganicAreaCotton] = useState("");

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(url);
        const buffer = await response.arrayBuffer();
        const wb = read(buffer, { type: "array" });
        const ws = wb.Sheets[wb.SheetNames[0]];
        const jsonData = utils.sheet_to_json(ws);
        let nameValue = "";
        let addressValue = "";

        for (let key in jsonData[0]) {
          if (key.startsWith("ICS NAME")) {
            nameValue = key.split(" : ")[1];
            addressValue = jsonData[0][key].split(" : ")[1];

            setIcsName(nameValue);
            setIcsAddress(addressValue);
          }
        }
        setCottonYield(jsonData[jsonData.length - 1]["__EMPTY_13"]);
        setTotalOrganicArea(jsonData[jsonData.length - 1]["__EMPTY_10"]);
        setTotalOrganicAreaCotton(jsonData[jsonData.length - 1]["__EMPTY_12"]);
        setData(jsonData.slice(6, jsonData.length - 1));
        setSeason(jsonData[1]["ICS NAME : " + nameValue].split(" : ")[1]);
      } catch (error) {
        console.error("Error fetching or parsing data:", error);
        toast.error("Error fetching data");
      }
    };

    if (url) fetchData();
  }, [url]);

  return (
    <>
      {url && data && (
        <div className="bg-[#f9fcff] w-full h-full 2xl:py-10 py-10">
          <table className="w-full" border={2}>
            <thead>
              <tr>
                <th
                  className="text-2xl font-[600] text-black py-1"
                  colSpan={13}
                >
                  ICS NAME : {icsName}
                </th>
              </tr>
              <tr>
                <th
                  className="text-2xl font-[600] text-black py-1"
                  colSpan={13}
                >
                  ICS ADDRESS : {icsAddress}
                </th>
              </tr>
              <tr>
                <th
                  className="text-2xl font-[600] text-black pt-1 pb-4"
                  colSpan={13}
                >
                  SEASON : {season}
                </th>
              </tr>
              <tr>
                <th
                  className="text-xl font-[600] text-black text-left py-1"
                  colSpan={7}
                >
                  Total Organic Area [in Hectare] : {totalOrganicArea}
                </th>
                <th className="text-xl font-[600] text-black py-1" colSpan={6}>
                  Estimate Cotton Yield [MT]: {cottonYield}
                </th>
              </tr>
              <tr>
                <th
                  className="text-xl font-[600] text-black pt-1 pb-4 text-left"
                  colSpan={7}
                >
                  Total Organic Area Cotton [in Hectare] :{" "}
                  {totalOrganicAreaCotton}
                </th>
                <th
                  className="text-xl font-[600] text-black pt-1 pb-4"
                  colSpan={6}
                >
                  CO2 Emission(Kg): 0
                </th>
              </tr>
              <tr className="border-b border-t border-[#d2d8dd]">
                {column?.length > 0 &&
                  column?.map((col, index) => (
                    <th
                      key={index}
                      className="text-xs font-[500] text-black py-[10px] pr-[10px]"
                    >
                      <span className="flex gap-2">{col}</span>
                    </th>
                  ))}
              </tr>
            </thead>
            <tbody>
              {data?.length > 0 &&
                data?.map((item, index) => (
                  <tr key={index}>
                    <td className="text-xs text-black py-[10px] pr-[10px] border-b border-[#d2d8dd]">
                      {item["ACTUAL FARMER LIST"]}
                    </td>
                    <td className="text-xs text-black py-[10px] pr-[10px] border-b border-[#d2d8dd]">
                      {item["__EMPTY"]}
                    </td>
                    <td className="text-xs text-black py-[10px] pr-[10px] border-b border-[#d2d8dd]">
                      {item["__EMPTY_1"]}
                    </td>
                    <td className="text-xs text-black py-[10px] pr-[10px] border-b border-[#d2d8dd]">
                      {item["ICS NAME : " + icsName]}
                    </td>
                    <td className="text-xs text-black py-[10px] pr-[10px] border-b border-[#d2d8dd]">
                      {item["__EMPTY_3"]}
                    </td>
                    <td className="text-xs text-black py-[10px] pr-[10px] border-b border-[#d2d8dd]">
                      {item["__EMPTY_4"]}
                    </td>
                    <td className="text-xs text-black py-[10px] pr-[10px] border-b border-[#d2d8dd]">
                      {item["__EMPTY_6"]}
                    </td>
                    <td className="text-xs text-black py-[10px] pr-[10px] border-b border-[#d2d8dd]">
                      {item["__EMPTY_7"]}
                    </td>
                    <td className="text-xs text-black py-[10px] pr-[10px] border-b border-[#d2d8dd]">
                      {item["__EMPTY_10"]}
                    </td>
                    <td className="text-xs text-black py-[10px] pr-[10px] border-b border-[#d2d8dd]">
                      {item["__EMPTY_11"]}
                    </td>
                    <td className="text-xs text-black py-[10px] pr-[10px] border-b border-[#d2d8dd]">
                      {item["__EMPTY_12"]}
                    </td>
                    <td className="text-xs text-black py-[10px] pr-[10px] border-b border-[#d2d8dd]">
                      {item["__EMPTY_13"]}
                    </td>
                    <td className="text-xs text-black py-[10px] pr-[10px] border-b border-[#d2d8dd]">
                      {"-"}
                    </td>
                  </tr>
                ))}
            </tbody>
            <tfoot>
              <tr className="border-t border-[#d2d8dd]">
                <th
                  colSpan={8}
                  className="text-xl font-[600] text-black py-[10px] pr-[10px] text-center"
                >
                  Total
                </th>
                <th className="text-xs font-[600] text-black py-[10px] pr-[10px] text-left">
                  {totalOrganicArea}
                </th>
                <th className="text-xs font-[600] text-black py-[10px] pr-[10px] text-left">
                  {totalOrganicArea}
                </th>
                <th className="text-xs font-[600] text-black py-[10px] pr-[10px] text-left">
                  {totalOrganicAreaCotton}
                </th>
                <th className="text-xs font-[600] text-black py-[10px] pr-[10px] text-left">
                  {cottonYield}
                </th>
                <th className="text-xs font-[600] text-black py-[10px] pr-[10px] text-left">
                  0
                </th>
              </tr>
            </tfoot>
          </table>
        </div>
      )}
    </>
  );
};

export default Demo;
