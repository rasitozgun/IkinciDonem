import {
  View,
  Text,
  StyleSheet,
} from "react-native";

const ProductPage = () => {
  const products = [
    { id: 1, name: "Saç kesimi", price: "20" },
    { id: 2, name: "Sakal kesimi", price: "15" },
    { id: 3, name: "Ense tıraşı", price: "10" },
    { id: 4, name: "Saç boyama", price: "30" },
  ];

  return (
    <View style={styles.container}>
      {products.map((product) => (
        <View
          key={product.id}
          style={styles.product}
        >
          <Text style={styles.name}>
            {product.name}
          </Text>
          <Text style={styles.price}>
            {product.price}TL
          </Text>
        </View>
      ))}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  product: {
    borderWidth: 1,
    borderColor: "gray",
    borderRadius: 5,
    padding: 10,
    marginVertical: 10,
    width: "80%",
  },
  name: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 5,
  },
  price: {
    fontSize: 16,
    fontWeight: "bold",
  },
});

export default ProductPage;
