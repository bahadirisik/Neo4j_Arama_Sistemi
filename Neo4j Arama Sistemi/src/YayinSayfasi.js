import { useParams } from "react-router-dom/cjs/react-router-dom.min";
import { useState, useEffect } from 'react';

var neo4j = require('neo4j-driver');

const YayinSayfasi = () => {
    var driver = neo4j.driver('bolt://localhost', neo4j.auth.basic('neo4j', '123456'));
    var session = driver.session();
    var aramaSonuc = [];
    const [yayinlar, setYayinlar] = useState([{}]);
    const [yayinYazarlari, setYayinYazarlari] = useState([]);
    const { id } = useParams();

    useEffect(() => {
        session
            .run('MATCH (a:Yayinlar) WHERE id(a)={idParam} RETURN a', { idParam: parseInt(id) })
            .then(function (result) {
                result.records.forEach(function (record) {
                    aramaSonuc = [];
                    aramaSonuc.push(record._fields[0].properties)
                    setYayinlar(aramaSonuc);
                    console.log(record._fields[0].properties);
                })
            })
            .catch(function (err) {
                console.log(err);
            });
    }, [])

    function YayinYazarlari(){
        session
            .run('match (a:Arastirmacilar)-[r:`YayınYazarı`]-(b:Yayinlar {name:{nameParam}}) return a', { nameParam: yayinlar[0].name })
            .then(function (result) {
                aramaSonuc = []
                result.records.forEach(function (record) {
                    aramaSonuc.push(record._fields[0])
                    setYayinYazarlari(aramaSonuc);
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
                <h2>{yayinlar[0].fullName}</h2>
                <br />
                <h2>{yayinlar[0].date}</h2>
                <br />
                <h2 onClick={YayinYazarlari}>Yayın Yazarları</h2>
                <br />
                <ul>
                    {yayinYazarlari.map((e, i) => {
                        return (
                            <a key={i} href={`/author/${e.identity.low}`} className="author-link">
                                <li>{e.properties.name} {e.properties.surname}</li>
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
 
export default YayinSayfasi;