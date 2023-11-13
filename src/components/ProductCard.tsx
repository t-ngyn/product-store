import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";
import { Box, Button, CardActionArea, CardActions } from "@mui/material";
import { useAppDispatch } from "../hooks";
import { add } from "../slices/CartItemSlice";

export interface IProductCardProps {
  id: number;
  imageUrl: string;
  title: string;
  description: string;
  price: number;
}

export function ProductCard(props: IProductCardProps) {
  const dispatch = useAppDispatch();
  return (
    <Card>
      <CardActionArea>
        <CardMedia component="img" image={props.imageUrl} alt={props.title} />
        <CardContent>
          <Typography gutterBottom variant="h5" component="div">
            {props.title}
          </Typography>
          <Typography variant="body2" color="text.secondary">
            {props.description}
          </Typography>
        </CardContent>
      </CardActionArea>
      <CardActions className="flex justify-between items-center">
        <Box>Price: ${props.price?.toFixed(2)}</Box>
        <Button
          size="small"
          color="primary"
          onClick={() => dispatch(add({ productId: props.id }))}
        >
          Add to Cart
        </Button>
      </CardActions>
    </Card>
  );
}
