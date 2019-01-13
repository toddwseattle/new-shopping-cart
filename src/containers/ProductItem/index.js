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
import ItemPrice from "../../components/ItemPrice";
import { CardHeader, Chip } from "@material-ui/core";

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
    product: PropTypes.object,
    addToCart: PropTypes.func
  };
  AddCartClick = ev => {
    this.props.addToCart(this.props.product);
    ev.preventDefault();
  };
  buildItemDescription(product) {
    return product.description
      ? ` ${product.title} (${product.description})`
      : `${product.title} in the style ${product.style}.`;
  }

  render() {
    const { classes, product, addToCart } = this.props;
    const prodbuild = true;
    const PUBLIC_URL = prodbuild
      ? "https://toddw-boot19-shop.firebaseapp.com"
      : "http://localhost:3000";
    return (
      <div>
        <Card className={classes.card}>
          <CardHeader
            title={product.title}
            subheader={this.buildItemDescription(product)}
          />
          <CardActionArea>
            {product.isFreeShipping ? (
              <Chip label={"Free Shipping!"} />
            ) : (
              <span />
            )}
            <CardMedia
              className={classes.media}
              image={PUBLIC_URL + `/products/${product.sku}_1.jpg`}
              title={`sku of ${product.title} at ${PUBLIC_URL}/products/${
                product.sku
              }_1.jpg`}
            />
            <CardContent>
              <Typography gutterBottom variant="h5" component="h2">
                <ItemPrice product={product} />
              </Typography>
              <Typography component="p" />
              <SizeChips sizes={product.availableSizes} />
            </CardContent>
          </CardActionArea>
          <CardActions>
            <Button size="small" color="primary" onClick={this.AddCartClick}>
              Add to Cart
            </Button>
          </CardActions>
        </Card>
      </div>
    );
  }
}

export default withStyles(styles)(ProductItem);
