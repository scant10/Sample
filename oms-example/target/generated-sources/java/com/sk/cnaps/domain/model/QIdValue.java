package com.sk.cnaps.domain.model;

import static com.querydsl.core.types.PathMetadataFactory.*;

import com.querydsl.core.types.dsl.*;

import com.querydsl.core.types.PathMetadata;
import javax.annotation.Generated;
import com.querydsl.core.types.Path;


/**
 * QIdValue is a Querydsl query type for IdValue
 */
@Generated("com.querydsl.codegen.EmbeddableSerializer")
public class QIdValue extends BeanPath<IdValue<? extends AggregateRoot>> {

    private static final long serialVersionUID = 1948776997L;

    public static final QIdValue idValue = new QIdValue("idValue");

    public final NumberPath<Long> id = createNumber("id", Long.class);

    @SuppressWarnings({"all", "rawtypes", "unchecked"})
    public QIdValue(String variable) {
        super((Class) IdValue.class, forVariable(variable));
    }

    @SuppressWarnings({"all", "rawtypes", "unchecked"})
    public QIdValue(Path<? extends IdValue> path) {
        super((Class) path.getType(), path.getMetadata());
    }

    @SuppressWarnings({"all", "rawtypes", "unchecked"})
    public QIdValue(PathMetadata metadata) {
        super((Class) IdValue.class, metadata);
    }

}

