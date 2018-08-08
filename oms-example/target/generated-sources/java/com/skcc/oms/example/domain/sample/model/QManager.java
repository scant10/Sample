package com.skcc.oms.example.domain.sample.model;

import static com.querydsl.core.types.PathMetadataFactory.*;

import com.querydsl.core.types.dsl.*;

import com.querydsl.core.types.PathMetadata;
import javax.annotation.Generated;
import com.querydsl.core.types.Path;


/**
 * QManager is a Querydsl query type for Manager
 */
@Generated("com.querydsl.codegen.EmbeddableSerializer")
public class QManager extends BeanPath<Manager> {

    private static final long serialVersionUID = 1650504168L;

    public static final QManager manager = new QManager("manager");

    public final StringPath department = createString("department");

    public final StringPath name = createString("name");

    public QManager(String variable) {
        super(Manager.class, forVariable(variable));
    }

    public QManager(Path<? extends Manager> path) {
        super(path.getType(), path.getMetadata());
    }

    public QManager(PathMetadata metadata) {
        super(Manager.class, metadata);
    }

}

