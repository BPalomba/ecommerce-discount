package com.invop.inventario.entities;


import jakarta.persistence.*;
import lombok.Data;

import java.math.BigDecimal;
import java.time.LocalDateTime;

@Data
@Entity
@Table(name ="Pedido")
public class Pedido {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name ="cargos_pedido")
    private int cargosPedido;
    @Column(name ="costo_pedido")
    private BigDecimal costoPedido;
    @Column(name ="demora_entrega")
    private LocalDateTime demoraEntrega;
    @Column(name ="precio_unitario")
    private BigDecimal precioUnitario;
}
