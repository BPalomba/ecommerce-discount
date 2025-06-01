package com.invop.inventario.entities;


import jakarta.persistence.*;
import lombok.Data;

import java.math.BigDecimal;

@Data
@Entity
@Table(name ="Articulos")
public class OrdenCompra {

    @Id
    @GeneratedValue (strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name ="tamanio_lote_oc")
    private int tamanioLoteOc;
    @Column(name ="total_oc")
    private BigDecimal totalOc;
}
