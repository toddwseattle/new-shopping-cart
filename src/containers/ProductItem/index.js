import React, { Component } from "react";
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import CardActionArea from "@material-ui/core/CardActionArea";
import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";
import CardMedia from "@material-ui/core/CardMedia";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";
import SizeChips from "../../components/SizeChips";

const styles = {
  card: {
    maxWidth: 333
  },
  media: {
    height: 483
  }
};
class ProductItem extends Component {
  static propTypes = {
    product: PropTypes.object
  };

  render() {
    const { classes, product } = this.props;
    const prodbuild = true;
    const PUBLIC_URL = prodbuild
      ? "https://toddw-boot19-shop.firebaseapp.com"
      : "http://localhost:3000";
    return (
      <div>
        <Card className={classes.card}>
          <CardActionArea>
            <CardMedia
              className={classes.media}
              image={PUBLIC_URL + `/products/${product.sku}_1.jpg`}
              title={`sku of ${product.title} at ${PUBLIC_URL}/products/${
                product.sku
              }_1.jpg`}
            />
            <CardContent>
              <Typography gutterBottom variant="h5" component="h2">
                {product.title}
              </Typography>
              <Typography component="p">
                {product.description
                  ? ` ${product.title} (${product.description})`
                  : product.title}{" "}
                in the style {product.style}.
              </Typography>
              <SizeChips sizes={product.availableSizes} />
            </CardContent>
          </CardActionArea>
          <CardActions>
            <Button size="small" color="primary">
              Add to Cart
            </Button>
          </CardActions>
        </Card>
      </div>
    );
  }
}

export default withStyles(styles)(ProductItem);
