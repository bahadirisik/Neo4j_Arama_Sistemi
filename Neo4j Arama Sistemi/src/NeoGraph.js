import React, { useEffect, useRef, useState } from "react";
import useResizeAware from "react-resize-aware";
import PropTypes from "prop-types";
import Neovis from "neovis.js/dist/neovis.js";

const NeoGraph = (props) => {
  const {
    width,
    height,
    containerId,
    backgroundColor,
    neo4jUri,
    neo4jUser,
    neo4jPassword,
  } = props;

  const [tut,setTut] = useState(null);
  const [sorgu,setSorgu] = useState(`MATCH (n)-[r]-(b) RETURN n,r,b`);
  console.log(sorgu);

  const visRef = useRef();

  useEffect(() => {
    const config = {
      container_id: visRef.current.id,
      server_url: neo4jUri,
      server_user: neo4jUser,
      server_password: neo4jPassword,
      labels: {
        Arastirmacilar: {
          caption: "name",
          size: 3.0,
        },
        Tur: {
            caption: "name",
            size: 3.0,
          },
        Yayinlar: {
            caption: "name",
            size: 3.0,
          },
      },
      relationships: {
        OrtakÇalışır: {
          caption: true,
          thickness: "count",
        },
        YayınYazarı: {
          caption: true,
          thickness: "count",
        },
        Yayınlanır: {
          caption: true,
          thickness: "count",
        },
      },
      initial_cypher:
        sorgu,
    };
    const vis = new Neovis(config);
    let tut1 = null;
    vis.registerOnEvent("completed", (e)=>{ 
      vis["_network"].on("click", (event)=>{ 
            console.log("AAAAAAAAAAAAAAAAAaAAAAA "+event.nodes[0]);
            tut1 = event.nodes[0];
            console.log("TUT : " + tut1);
            if(tut1 != null && tut1 != undefined){
              console.log(`MATCH (n) where id(n)=${tut1} match (n)-[r]-(b) return n,b,r`)
              setSorgu(`MATCH (n) where id(n)=${tut1} match (n)-[r]-(b) return n,b,r`);
              console.log("aa");
            }
          });
    });
    vis.render();
  });

  return (
    <div
      id={containerId}
      ref={visRef}
      style={{
        width: `${width}px`,
        height: `${height}px`,
        backgroundColor: `${backgroundColor}`,
      }}
    />
  );
};

NeoGraph.defaultProps = {
  width: 600,
  height: 600,
  backgroundColor: "#d3d3d3",
};

NeoGraph.propTypes = {
  width: PropTypes.number.isRequired,
  height: PropTypes.number.isRequired,
  containerId: PropTypes.string.isRequired,
  neo4jUri: PropTypes.string.isRequired,
  neo4jUser: PropTypes.string.isRequired,
  neo4jPassword: PropTypes.string.isRequired,
  backgroundColor: PropTypes.string,
};


const ResponsiveNeoGraph = (props) => {
  const [resizeListener, sizes] = useResizeAware();

  const side = Math.max(sizes.width, sizes.height) / 2;
  const neoGraphProps = { ...props, width: 1200, height: 800 };
  return (
    <div style={{ position: "relative" }}>
      {resizeListener}
      <NeoGraph {...neoGraphProps} />
    </div>
  );
};

ResponsiveNeoGraph.defaultProps = {
  backgroundColor: "#d3d3d3",
};

ResponsiveNeoGraph.propTypes = {
  containerId: PropTypes.string.isRequired,
  neo4jUri: PropTypes.string.isRequired,
  neo4jUser: PropTypes.string.isRequired,
  neo4jPassword: PropTypes.string.isRequired,
  backgroundColor: PropTypes.string,
};

export { NeoGraph, ResponsiveNeoGraph };
