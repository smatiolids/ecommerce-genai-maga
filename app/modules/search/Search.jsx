import React, { useEffect, useState } from "react";
import {
  FileInput,
  SimpleForm,
  useNotify,
  TextInput,
  SaveButton,
  NumberInput,
  SelectInput,
} from "react-admin";
import {
  Grid,
  Card,
  CardContent,
  CardHeader,
  CardMedia,
  Typography,
} from "@mui/material";
import CircularProgress from "@mui/material/CircularProgress";
import Box from "@mui/material/Box";
import { useForm, useWatch, getValues } from "react-hook-form";

export const Search = () => {
  const [products, setProducts] = useState([]);
  const { watch, formState, register } = useForm();
  const notify = useNotify();
  const [file, setFile] = useState();
  const [preview, setPreview] = useState();

  // create a preview as a side effect, whenever selected file is changed
  useEffect(() => {
    if (!file) {
      setPreview(undefined);
      return;
    }

    const objectUrl = URL.createObjectURL(file);
    setPreview(objectUrl);

    // free memory when ever this component is unmounted
    return () => URL.revokeObjectURL(objectUrl);
  }, [file]);

  const onChangeHandler = (event) => {
    console.log(event);
    setFile(event);
  };

  const onSubmit = async (data) => {
    try {
      const formData = new FormData();
      if (data.file) formData.append("file", data.file.rawFile);

      formData.append(
        "post",
        JSON.stringify({
          query: data.query,
          n: data.n || 20,
        })
      );

      const res = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/search`, {
        method: "POST",
        // headers: { "Content-Type": "application/json" },
        body: formData,
      });

      const response = await res.json();
      setProducts(response.data);
    } catch (error) {
      console.error("Error saving record:", error);
      notify("error", "Error saving record");
    }
  };

  return (
    <Card>
      <CardHeader title="Busca por similaridade" />
      <CardContent>
        <SimpleForm onSubmit={onSubmit} toolbar={false}>
          <Grid container alignItems="center">
            <Grid item xs={4} ml="0.5em" direction="row">
              <FileInput
                source="file"
                name="file"
                label="Envie uma foto"
                accept="image/*"
                placeholder="Arraste a imagem ou clique para selecionar"
                onChange={onChangeHandler}
              />
            </Grid>
            <Grid item xs={6} ml="0.5em" direction="row">
              {file && <img src={preview} width="50" height={50} />}
            </Grid>
            <Grid item xs={3} ml="0.5em">
              <TextInput
                source="query"
                label="Mais alguma informação?"
                fullWidth
              />
            </Grid>

            <Grid item xs={2} ml="0.5em">
              <SelectInput
                source="n"
                fullWidth
                label="Qtde"
                emptyValue={10}
                choices={[
                  { id: 10, name: "10" },
                  { id: 20, name: "20" },
                  { id: 30, name: "30" },
                ]}
              />
            </Grid>
            <Grid item xs={3} ml="0.5em">
              <SaveButton
                label="Search"
                disabled={formState.isSubmitting}
                fullWidth
              />
            </Grid>
          </Grid>
        </SimpleForm>
        {products && products.length > 0 && <ImageGrid data={products} />}
      </CardContent>
    </Card>
  );
};

const ImageGrid = (props) => {
  return (
    <Grid container spacing={2} sx={{ mt: 0 }}>
      {props.data.map((record) => (
        <Grid key={record.file} xs={12} sm={6} md={4} lg={3} xl={2} item>
          <Card>
            <CardMedia image={`img/${record.file}`} sx={{ height: 140 }} />
            <CardContent sx={{ paddingBottom: "0.5em" }}>
              <CircularProgressWithLabel value={record.distance * 100} />
              <Typography align="center">{record.title}</Typography>
            </CardContent>
          </Card>
        </Grid>
      ))}
    </Grid>
  );
};

function CircularProgressWithLabel(props) {
  return (
    <Box sx={{ position: "relative", display: "inline-flex" }}>
      <CircularProgress variant="determinate" {...props} />
      <Box
        sx={{
          top: 0,
          left: 0,
          bottom: 0,
          right: 0,
          position: "absolute",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <Typography
          variant="caption"
          component="div"
          color="text.secondary"
        >{`${Math.round(props.value)}%`}</Typography>
      </Box>
    </Box>
  );
}
