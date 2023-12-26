import * as React from "react";
import { Card, CardContent, CardHeader } from "@mui/material";
import { Link } from "react-admin";

const Dashboard = () => (
  <Card>
    <CardHeader title="The GenAI Store" />
    <CardContent>
      <p class="pb-10">Sem dados, não há Inteligência Artificial.</p>

      <p class="pb-10">
        Esta aplicação utiliza IA Generativa para buscas que combinam imagem e
        texto.
      </p>
      <div class="pb-10">
        <img
          src="architecture.png"
          width="1000"
        />
      </div>
      <p class="pb-10">A partir de dados de imagem e texto combinados em <Link to="https://www.youtube.com/watch?v=ygRurMXa5uw" target="blank">embeddings</Link> multimodais.</p>
      <p class="pb-10">Com os embeddings/vetores gravados no DSE, a aplicação pode fazer buscas por similaridades.</p>

    </CardContent>
  </Card>
);

export default Dashboard;
