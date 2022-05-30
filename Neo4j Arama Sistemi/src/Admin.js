import { useState } from 'react';

const Admin = () => {
    var neo4j = require('neo4j-driver');
    var driver = neo4j.driver('bolt://localhost', neo4j.auth.basic('neo4j', '123456'));
    var session = driver.session();

    const [arasAdi, setarasAdi] = useState("");
    const [arasId, setarasId] = useState("");
    const [arassoyAdi, setarasSoyadi] = useState("");
    const [yayinAdi, setyayinAdi] = useState("");
    const [yayinYili, setyayinYili] = useState("");
    const [yayinYeri, setyayinYeri] = useState("");
    const [yayinId, setyayinId] = useState("");
    const [yayinTur, setyayinTur] = useState("");

    async function nodeEkle(event) {
        event.preventDefault();
        console.log(arasId, arasAdi, arassoyAdi, yayinAdi, yayinYeri, yayinYili, yayinId);
        session
            .run('match (b:Tur {name:{turParam}}) MERGE (n:Arastirmacilar {name:{nameParam}, surname:{surnameParam},id:{idParam}}) -[r:`YayınYazarı`]- (a:Yayinlar {fullName:{fullNameParam}, date:{dateParam},yayinYeri:{yayinYeriParam},id:{yayinIdParam}}) -[l:`Yayınlanır`]->(b) RETURN n,a', { turParam:yayinTur,nameParam: arasAdi, surnameParam: arassoyAdi, idParam: arasId, fullNameParam: yayinAdi, dateParam: yayinYili, yayinYeriParam: yayinYeri, yayinIdParam: yayinId })
            .then(function (result) {
                result.records.forEach(function (record) {
                    console.log(record._fields[0].properties)
                    console.log("girdim");
                    session
                        .run('MATCH (n:Yayinlar {fullName:{fullNameParam}}) return n.fullName,id(n)', { fullNameParam: yayinAdi })
                        .then(function (result) {
                            result.records.forEach(function (record) {
                                let uzunAdi = record._fields[0];
                                const nameArray = uzunAdi.split(" ");
                                let kisaAd = nameArray[0] + "  " + record._fields[1].low
                                console.log(kisaAd);
                                session
                                    .run('MATCH (n:Yayinlar {fullName:{fullNameParam}}) set n.name={kisaAdParam}', { fullNameParam: yayinAdi, kisaAdParam: kisaAd })
                                    .then(function(result){

                                    })
                            })
                        })
                        .catch(function (err) {
                            console.log(err);
                        });
                })
            })
            .catch(function (err) {
                console.log(err);
            });
    }


    return (
        <div className="create">

            <form onSubmit={nodeEkle}>
                <h2>Araştırmacı ID</h2>
                <input type="text" required value={arasId} onChange={(e) => setarasId(e.target.value)}></input>
                <h2>Araştırmacı Adı</h2>
                <input type="text" required value={arasAdi} onChange={(e) => setarasAdi(e.target.value)}></input>
                <h2>Araştırmacı Soyadı</h2>
                <input type="text" required value={arassoyAdi} onChange={(e) => setarasSoyadi(e.target.value)}></input>
                <h2>Yayın Adı</h2>
                <input type="text" required value={yayinAdi} onChange={(e) => setyayinAdi(e.target.value)}></input>
                <h2>Yayın Yılı</h2>
                <input type="text" required value={yayinYili} onChange={(e) => setyayinYili(e.target.value)}></input>
                <h2>Yayın Yeri</h2>
                <input type="text" required value={yayinYeri} onChange={(e) => setyayinYeri(e.target.value)}></input>
                <h2>Yayın ID</h2>
                <input type="text" required value={yayinId} onChange={(e) => setyayinId(e.target.value)}></input>
                <h2>Yayın Türü</h2>
                <input type="text" required value={yayinTur} onChange={(e) => setyayinTur(e.target.value)}></input>

                <button>KAYDET</button>
            </form>
            <br />
            <br />
            <br />
            <a href='/'>
                <button>Logout</button>
            </a>
        </div>
    );
}

export default Admin;