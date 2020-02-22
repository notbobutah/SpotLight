\c postgres

CREATE SEQUENCE IF NOT EXISTS  nodes_id_seq START 100;
CREATE SEQUENCE IF NOT EXISTS connectors_id_seq START 100;

-- Table: public.nodes
CREATE TABLE IF NOT EXISTS public.nodes
(
    id integer NOT NULL DEFAULT nextval('nodes_id_seq'::regclass),
    nodebody json,
    "offsetX" bigint,
    "offsetY" bigint,
    CONSTRAINT nodes_pkey PRIMARY KEY (id)
);


ALTER TABLE public.nodes
    OWNER to postgres;

COMMENT ON TABLE public.nodes
    IS 'storage for flow chart nodes';

 -- Table: public.connectors

CREATE TABLE IF NOT EXISTS public.connectors
(
    id integer NOT NULL DEFAULT nextval('connectors_id_seq'::regclass),
    connetorbody json,
    sourcenode bigint,
    targetnode bigint,
    CONSTRAINT connectors_pkey PRIMARY KEY (id)
);

ALTER TABLE public.connectors
    OWNER to postgres;

COMMENT ON TABLE public.connectors
    IS 'storage for connectors in the flow chart';   