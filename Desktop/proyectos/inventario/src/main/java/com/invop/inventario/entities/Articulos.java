package com.invop.inventario.entities;


import jakarta.persistence.*;
import lombok.Data;

import java.math.BigDecimal;
import java.time.LocalDateTime;

@Data
@Entity
@Table(name ="Articulos")
public class Articulos {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "costo_almacenamiento")
    private BigDecimal costoAlmacenamiento;

    @Column(name = "costo_articulo")
    private BigDecimal costoArticulo;

    @Column(name = "descripcion_articulo")
    private String descripcionArticulo;

    @Column(name = "stock_articulo")
    private int stockArticulo;


}
