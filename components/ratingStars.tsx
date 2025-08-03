import React from "react";
import { StyleSheet, View } from "react-native";
import { IconSymbol } from "./ui/IconSymbol";

interface RatingStarsProps {
  rating: number; // de 0 a 5, puede ser decimal como 3.5
  size?: number;
  color?: string;
}

export const RatingStars: React.FC<RatingStarsProps> = ({
  rating,
  size = 20,
  color = "#FFD700", // dorado por defecto
}) => {
  const fullStars = Math.floor(rating);
  const hasHalfStar = rating - fullStars >= 0.25;
  const emptyStars = 5 - fullStars - (hasHalfStar ? 1 : 0);

  return (
    <View style={styles.container}>
      {[...Array(fullStars)].map((_, i) => (
        <IconSymbol
          key={`full-${i}`}
          name="star-full.fill"
          color={color}
          size={size}
        />
      ))}
      {hasHalfStar && (
        <IconSymbol name="star-half.fill" color={color} size={size} />
      )}
      {[...Array(emptyStars)].map((_, i) => (
        <IconSymbol
          key={`empty-${i}`}
          name="star-outline.fill"
          color={color}
          size={size}
        />
      ))}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
  },
});
