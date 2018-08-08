package com.skcc.oms.example.domain.sample.model;

import static com.querydsl.core.types.PathMetadataFactory.*;

import com.querydsl.core.types.dsl.*;

import com.querydsl.core.types.PathMetadata;
import javax.annotation.Generated;
import com.querydsl.core.types.Path;
import com.querydsl.core.types.dsl.PathInits;


/**
 * QBusiness is a Querydsl query type for Business
 */
@Generated("com.querydsl.codegen.EntitySerializer")
public class QBusiness extends EntityPathBase<Business> {

    private static final long serialVersionUID = -1644075803L;

    private static final PathInits INITS = PathInits.DIRECT2;

    public static final QBusiness business = new QBusiness("business");

    public final com.sk.cnaps.domain.model.QAbstractEntity _super = new com.sk.cnaps.domain.model.QAbstractEntity(this);

    public final SimplePath<BusinessDetail> businessDetail = createSimple("businessDetail", BusinessDetail.class);

    public final ListPath<Contact, QContact> contacts = this.<Contact, QContact>createList("contacts", Contact.class, QContact.class, PathInits.DIRECT2);

    public final StringPath description = createString("description");

    //inherited
    public final NumberPath<Long> id = _super.id;

    public final QManager manager;

    public final StringPath name = createString("name");

    public final ListPath<SubBusiness, QSubBusiness> subBusinesses = this.<SubBusiness, QSubBusiness>createList("subBusinesses", SubBusiness.class, QSubBusiness.class, PathInits.DIRECT2);

    public final ListPath<Worker, SimplePath<Worker>> workers = this.<Worker, SimplePath<Worker>>createList("workers", Worker.class, SimplePath.class, PathInits.DIRECT2);

    public QBusiness(String variable) {
        this(Business.class, forVariable(variable), INITS);
    }

    public QBusiness(Path<? extends Business> path) {
        this(path.getType(), path.getMetadata(), PathInits.getFor(path.getMetadata(), INITS));
    }

    public QBusiness(PathMetadata metadata) {
        this(metadata, PathInits.getFor(metadata, INITS));
    }

    public QBusiness(PathMetadata metadata, PathInits inits) {
        this(Business.class, metadata, inits);
    }

    public QBusiness(Class<? extends Business> type, PathMetadata metadata, PathInits inits) {
        super(type, metadata, inits);
        this.manager = inits.isInitialized("manager") ? new QManager(forProperty("manager")) : null;
    }

}

