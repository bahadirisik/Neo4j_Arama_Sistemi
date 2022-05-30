import { useParams } from "react-router-dom/cjs/react-router-dom.min";
import { useState, useEffect } from 'react';

var neo4j = require('neo4j-driver');

const ArastirmaciSayfasi = () => {
    var driver = neo4j.driver('bolt://localhost', neo4j.auth.basic('neo4j', '123456'));
    var session = driver.session();
    var aramaSonuc = [];
    const [author, setAuthor] = useState([{}]);
    const [collaborators, setCollaborators] = useState([]);
    const [yayinlari, setYayinlari] = useState([]);
    const { id } = useParams();

    useEffect(() => {
        session
            .run('MATCH (a:Arastirmacilar) WHERE id(a)={idParam} RETURN a', { idParam: parseInt(id) })
            .then(function (result) {
                result.records.forEach(function (record) {
                    aramaSonuc = [];
                    aramaSonuc.push(record._fields[0].properties)
                    setAuthor(aramaSonuc);
                    console.log(record._fields[0].properties);
                })
            })
            .catch(function (err) {
                console.log(err);
            });
    }, [])

    function BirlikteCalistikleri() {
        session
            .run('MATCH (a:Arastirmacilar {name:{nameParam}})-[r:`OrtakÇalışır`]-(b:Arastirmacilar) RETURN b', { nameParam: author[0].name })
            .then(function (result) {
                aramaSonuc = []
                result.records.forEach(function (record) {
                    aramaSonuc.push(record._fields[0])
                    setCollaborators(aramaSonuc);
                    console.log(record._fields[0].properties);
                })
            })
            .catch(function (err) {
                console.log(err);
            });
    }

    function Yayinlari() {
        session
            .run('MATCH (a:Arastirmacilar {name:{nameParam}})-[r:`YayınYazarı`]-(b:Yayinlar) RETURN b', { nameParam: author[0].name })
            .then(function (result) {
                aramaSonuc = []
                result.records.forEach(function (record) {
                    aramaSonuc.push(record._fields[0])
                    setYayinlari(aramaSonuc);
                    console.log(record._fields[0].properties);
                })
            })
            .catch(function (err) {
                console.log(err);
            });
    }


    return (
        <div className="create">
            <div className="author-details">
                <h2>{author[0].name} {author[0].surname} Sayfası</h2>
                <br />
                <br />
                <h2 onClick={BirlikteCalistikleri}>Ortak Çalıştığı Kişiler</h2>
                <br />
                <ul>
                    {collaborators.map((e, i) => {
                        return (
                            <a key={i} href={`/author/${e.identity.low}`} className="author-link">
                                <li>{e.properties.name} {e.properties.surname}</li>
                            </a>
                        );
                    })}
                </ul>

                <h2 onClick={Yayinlari}>Yayınları</h2>
                <br />
                <ul>
                    {yayinlari.map((e, i) => {
                        return (
                            <a key={i} href={`/yayinlar/${e.identity.low}`} className="author-link">
                                <li>{e.properties.name} {e.properties.date}</li>
                            </a>
                        );
                    })}
                </ul>
                <br />
                <br />
                <a href="/kullanici" className="author-link">
                    <h2>Araştırmacı Sayfasına Dön</h2>
                </a>
            </div>
        </div>
    );
}

export default ArastirmaciSayfasi;