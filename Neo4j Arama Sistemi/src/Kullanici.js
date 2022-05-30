import { useState } from 'react';
import { NeoGraph, ResponsiveNeoGraph } from "./NeoGraph";

const NEO4J_URI = "bolt://localhost";
const NEO4J_USER = "neo4j";
const NEO4J_PASSWORD = "123456";

var neo4j = require('neo4j-driver');
const Kullanici = () => {

    var driver = neo4j.driver('bolt://localhost', neo4j.auth.basic('neo4j', '123456'));
    var session = driver.session();
    var aramaSonuc = [];
    const [arama, setArama] = useState([]);

    function AramaYap() {
        session
            .run('MATCH (n) WHERE n.name CONTAINS {nameParam} or n.surname CONTAINS {surnameParam} or n.date CONTAINS {dateParam} or n.id CONTAINS {idParam} or n.fullName CONTAINS {fullNameParam}  RETURN n LIMIT 25', { nameParam: document.getElementById("arama").value, surnameParam: document.getElementById("arama").value, dateParam: document.getElementById("arama").value, idParam: document.getElementById("arama").value, fullNameParam: document.getElementById("arama").value })
            .then(function (result) {
                result.records.forEach(function (record) {
                    aramaSonuc.push(record._fields[0])
                    setArama(aramaSonuc);
                    console.log(record._fields[0].identity.low);
                    console.log(record._fields[0].properties.name);
                })
            })
            .catch(function (err) {
                console.log(err);
            });
    }


    return (
        <div className="kullaniciPanel">
            <div className="form-inner">
                <h2>Arama</h2>
                <div className="form-group">
                    <input type="text" name='arama' id='arama'></input>
                </div>
                <button name='aramaButon' id='aramaButon' onClick={AramaYap}>Arama Yap</button>
            </div>
            <h2>Arama Sonuçları</h2>
            <ul>
                {arama.map((e, i) => {
                    if (e.properties.surname != null) {
                        return (
                            <a key={i} href={`/author/${e.identity.low}`} className="author-link">
                                <li>{e.properties.name} {e.properties.surname}</li>
                            </a>
                        );
                    }
                    else if (e.properties.date != null) {
                        return (
                            <a key={i} href={`/yayinlar/${e.identity.low}`} className="author-link">
                                <li key={i}>{e.properties.name} {e.properties.date}</li>
                            </a>
                        );
                    }
                })}
            </ul>
            <br />
            <br />
            <br />
            <a href='/'>
                <button>Logout</button>
            </a>
            <ResponsiveNeoGraph
                containerId={"id0"}
                neo4jUri={NEO4J_URI}
                neo4jUser={NEO4J_USER}
                neo4jPassword={NEO4J_PASSWORD}
            />
        </div>
    );
}

export default Kullanici;