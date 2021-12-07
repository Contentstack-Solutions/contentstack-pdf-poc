import React from "react";
import ReactDOM from "react-dom";
import fetcher from "./fetcher";
import useSWR from "swr";
import MyDoc from "./MyDoc";
import {Row, Col, Button} from 'react-bootstrap';
import { PDFDownloadLink } from "@react-pdf/renderer";

function App() {
  const { data, error } = useSWR(
    `https://cdn.contentstack.io/v3/content_types/product/entries/blt3c1e5a86818bf719?environment=dev`,
    fetcher
  );

  if (error) return "An error has occurred.";
  if (!data) return <div></div>;

  const pagedata = data.entry;
  console.log(pagedata);

  return (
    <div>
      <Row className="m-5">
        <Col sm={6}>
          {" "}
          <h1>{pagedata.title}</h1>
          {
        pagedata.body.children.map((item) => {
            return (
                <p>{item.children[0].text}</p>
            )
        })
      }
        </Col>
        <Col sm={6}>
          {" "}
          <Button>
          <PDFDownloadLink
          className="white"
            document={<MyDoc props={pagedata} />}
            fileName="cisco.pdf"
          >
            {({ blob, url, loading, error }) =>
              loading ? "Loading document..." : "Download PDF"
            }
          </PDFDownloadLink>
          </Button>
        </Col>
      </Row>
    </div>
  );
}

export default App;

ReactDOM.render(<App />, document.getElementById("root"));
