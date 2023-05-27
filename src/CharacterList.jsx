import React, { useState, useEffect } from "react";
import { Card, Spin, Row, Col, Select, Input } from "antd";
import { Link } from "react-router-dom";
import { getCharacters } from "./api";
import logo from "./RickAndMorty.png";
import "./CharacterList.css"
const { Option } = Select;

const CharacterList = () => {
  const [characters, setCharacters] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filterName, setFilterName] = useState("");
  const [filterStatus, setFilterStatus] = useState("");
  const [filterGender, setFilterGender] = useState("");

  useEffect(() => {
    const fetchCharacters = async () => {
      try {
        const characterData = await getCharacters(
          filterName,
          filterStatus,
          filterGender
        );
        setCharacters(characterData.results);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching characters:", error);
        setLoading(false);
      }
    };

    fetchCharacters();
  }, [filterName, filterStatus, filterGender]);

  const handleNameChange = (e) => {
    setFilterName(e.target.value);
  };

  const handleStatusChange = (value) => {
    setFilterStatus(value);
  };

  const handleGenderChange = (value) => {
    setFilterGender(value);
  };

  return (
    <div style={{textAlign:"center"}}>
      <header className="logo">
        <img style={{width:"500px"}} className="logo__img" src={logo} alt="Rick and Morty" />
      </header>
      <h1 style={{color:"white"}} >Rick and Morty Characters</h1>
      <div className="character-filters">
        <Input
          className="filter-input"
          placeholder="Filter by name"
          value={filterName}
          onChange={handleNameChange}
        />
       
        <Select
          className="filter-select"
          placeholder="Filter by status"
          onChange={handleStatusChange}
          allowClear
        >
          <Option value="Alive">Alive</Option>
          <Option value="Dead">Dead</Option>
          <Option value="unknown">Unknown</Option>
        </Select>
        <Select
          className="filter-select"
          placeholder="Filter by gender"
          onChange={handleGenderChange}
          allowClear
        >
          <Option value="Male">Male</Option>
          <Option value="Female">Female</Option>
          <Option value="Genderless">Genderless</Option>
          <Option value="unknown">Unknown</Option>
        </Select>
      </div>
      <br/>
      {loading ? (
        <Spin />
      ) : (
        <>
          {characters.length === 0 ? (
            <p>No characters found</p>
          ) : (
            <Row   gutter={[16, 16]}>
              {characters.map((character) => (
                <Col key={character.id} xs={24} sm={12} md={8} lg={6}>
                  <Card
                    hoverable
                    cover={<img alt={character.name} src={character.image} />}
                  >
                    <Link to={`/character/${character.id}`}>
                      <Card.Meta title={character.name} />
                    </Link>
                  </Card>
                </Col>
              ))}
            </Row>
          )}
        </>
      )}
    </div>
  );
};

export default CharacterList;
