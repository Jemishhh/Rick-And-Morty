import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { Spin, Card, Avatar, Divider } from 'antd';
import { getCharacterById } from './api';
import './CharacterDetail.css';

const CharacterDetail = () => {
  const { id } = useParams();
  const [character, setCharacter] = useState(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchCharacter = async () => {
      setLoading(true);
      const characterData = await getCharacterById(id);
      setCharacter(characterData);
      setLoading(false);
    };

    fetchCharacter();
  }, [id]);

  return (
    <div className="character-detail-container">
      <h1 className="character-detail-title">Character Detail</h1>
      {loading ? (
        <Spin />
      ) : (
        character && (
          <Card className="character-detail-card">
            <div className="character-detail-content">
              <div className="character-detail-image">
                <Avatar src={character.image} size={200} alt={character.name} />
                 <h2 style={{textAlign:"center"}}>{character.name}</h2> <span></span>
              </div>
              <div className="character-detail-info">
               
              
                <Divider className="character-detail-divider" orientation="left">
                <p>{`Species: ${character.species}`}</p>
                </Divider>

                <Divider className="character-detail-divider" orientation="left">
                <p>{`Status: ${character.status}`}</p>
                </Divider>
                
                <Divider className="character-detail-divider" orientation="left">
                <p>{`Gender: ${character.gender}`}</p>
                </Divider>
                
                <Divider className="character-detail-divider" orientation="left">
                <p>{`Location: ${character.location.name}`}</p>
                </Divider>
                
                <Divider className="character-detail-divider" orientation="left">
                <p>{`Origin: ${character.origin.name}`}</p>
                </Divider>
               
              </div>
            </div>
          </Card>
        )
      )}
    </div>
  );
};

export default CharacterDetail;
